"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";
import ordersApi from "@/lib/api/ordersApi";
import AddressInput from "@/components/AddressInput";
import couponsApi from "@/lib/api/couponsApi";
import PopupOrdersDeliveryAddresses from "@/components/popups/PopupOrdersDeliveryAddresses";
import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";
import { safeToLocaleString } from "@/lib/util/safeToLocaleString";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const order_id = searchParams.get('order_id');

    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [order, setOrder] = useState();

    const [isPopupOrdersDeliveryAddresses, setIsPopupOrdersDeliveryAddresses] = useState(false)

    const [userCoupons, setUserCoupons] = useState([]);

    const [form, setForm] = useState({
        buyer_name: user?.name || "", // 주문자 이름
        buyer_contact: user?.phone || "", // 주문자 연락처
        delivery_name: "", // 배송지명
        delivery_phone: "", // 배송지 연락처
        delivery_postal_code: "", // 배송지 우편번호
        delivery_address: "", // 배송지 주소
        delivery_address_detail: "", // 배송지 상세주소
        delivery_request: "", // 배송 요청 사항

        user_coupon_id: "", // 쿠폰
        coupon_discount_amount: 0, // 쿠폰으로 할인된금액
        user_coupon_discount_amount: "",
        user_coupon_discount_rate: "",
        user_coupon_usage_limit_amount: 0,

        use_points: 0, // 적립금
        common_entrance_method: "", // 공동현관 출입방법
        common_entrance_password: "",

        pay_method_method: "card", // 결제방법

        total_amount: 0,
        price: 0,

        agreeAll: false,
        agreeTerms: false,
        agreePrivacy: false,
        // agreePayment: false,
    });
    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type == 'checkbox' ? checked : value
        });
    };

    useEffect(() => {
        show()
    }, [searchParams])


    function show() {
        ordersApi.show(order_id, {}, (response) => {
            setOrder(response.data.data);
        });
    }

    useEffect(() => {
        if (user && order) {
            indexUserCoupons()
        }
    }, [order])



    // 유저정보고 배송지 뿌리기
    useEffect(() => {
        getDeliveryAddresses()
    }, []);
    function getDeliveryAddresses() {
        deliveryAddressesApi.index({}, (response) => {
            const addresses = response.data.data;

            // 기본 배송지 찾기
            const defaultAddress = addresses.find((item) => item.is_default === 1);

            if (defaultAddress) {
                setForm((prevForm) => ({
                    ...prevForm,
                    delivery_name: defaultAddress.name,
                    delivery_phone: defaultAddress.phone,
                    delivery_postal_code: defaultAddress.postal_code,
                    delivery_address: defaultAddress.address,
                    delivery_address_detail: defaultAddress.address_detail,
                    delivery_request: defaultAddress.delivery_request,
                }));
            } else {
                setForm(prevForm => ({
                    ...prevForm,
                    delivery_name: user.name || "",
                    delivery_phone: user.phone || "",
                    delivery_postal_code: user.postal_code || "",
                    delivery_address: user.address || user.address,
                    delivery_address_detail: user.address_detail || ""
                }));
            }
        });
    }


    // 사용자 쿠폰 리스트
    function indexUserCoupons() {
        couponsApi.indexUserCoupons({
            total_order_amount: order.total_amount,
        }, (response) => {
            setUserCoupons(response.data.data)
        });
    }


    const {
        totalOriginalPrice,
        totalDiscountPrice,
        totalCouponDiscount,
        totalPointsUsed,
        totalFinalPrice,
        totalDiscountAmount
    } = useMemo(() => {
        if (!order) {
            return {
                totalOriginalPrice: 0,
                totalDiscountPrice: 0,
                totalCouponDiscount: 0,
                totalPointsUsed: 0,
                totalFinalPrice: 0,
                totalDiscountAmount: 0,
            };
        }

        let totalOriginalPrice = 0;
        let totalDiscountPrice = 0;

        order.orderProducts.forEach((product) => {
            const { quantity, productOption } = product;
            totalOriginalPrice += productOption.original_price * quantity;
            totalDiscountPrice += (productOption.original_price - productOption.price) * quantity;
        });

        const deliveryFee = order.delivery_fee || 0;

        // 퍼센트 할인 기준: 상품가 - 자체할인 + 배송비
        const percentBasePrice = totalOriginalPrice - totalDiscountPrice + deliveryFee;

        let totalCouponDiscount = 0;

        // ✅ 퍼센트 쿠폰 적용 (문자열일 수 있으므로 !== "" 체크)
        if (form.user_coupon_discount_rate !== "") {
            const rate = parseFloat(form.user_coupon_discount_rate);
            const percentDiscount = Math.round(percentBasePrice * (rate / 100));
            const maxDiscount = form.user_coupon_usage_limit_amount || Infinity;
            totalCouponDiscount = Math.min(percentDiscount, maxDiscount);
        }
        // ✅ 정액 쿠폰 적용
        else if (form.user_coupon_discount_amount !== "") {
            totalCouponDiscount = parseInt(form.user_coupon_discount_amount, 10) || 0;
        }

        const totalPointsUsed = parseInt(form.use_points, 10) || 0;

        const totalDiscountAmount = totalDiscountPrice + totalCouponDiscount + totalPointsUsed;

        const totalFinalPrice = totalOriginalPrice - totalDiscountAmount + deliveryFee;

        return {
            totalOriginalPrice,
            totalDiscountPrice,
            totalCouponDiscount,
            totalPointsUsed,
            totalFinalPrice,
            totalDiscountAmount,
        };
    }, [order, form]);



    useEffect(() => {
        if (order) {
            setForm((prevForm) => ({
                ...prevForm,
                price: totalFinalPrice,
                total_amount: order.total_amount,
                coupon_discount_amount: totalCouponDiscount,
            }));
        }
    }, [order, totalFinalPrice, totalCouponDiscount]);



    // 결제시도
    function update() {
        if (
            !form.agreeTerms ||
            !form.agreePrivacy
        ) {
            dispatch(actions.setMessage("필수 약관에 동의해 주세요."));
            return; // 전송 중단
        }




        ordersApi.update(order_id, form, (response) => {
            const data = response.data.data;
            pay(data.imp_code, data.m_redirect_url, data.order, order.orderProducts[0]?.product.name);
        });
    }

    const pay = (impCode, redirectUrl, order, product_name) => {
        let IMP = window.IMP; // 생략가능

        IMP.init(impCode); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

        IMP.request_pay({
            pg: order.pay_method_pg,
            pay_method: order.pay_method_method,
            merchant_uid: order.merchant_uid,
            customer_id: order.merchant_uid,
            name: product_name ? product_name : "열매나무 상품",
            escrow: order.pay_method_method === 'card' ? false : true,
            goods_name: order.format_preset_products,
            amount: order.price,
            buyer_name: order.buyer_name,
            buyer_tel: order.buyer_contact,
            buyer_email: user ? user.email : '',
            buyer_addr: order.buyer_address,
            buyer_postcode: form.buyer_address_zipcode,
            m_redirect_url: redirectUrl,
            display: { card_quota: [0, 6] },
        }, function (response) {
            if (!response.error_msg) {
                form.imp_uid = response.imp_uid;
                form.merchant_uid = response.merchant_uid;

                setForm({ ...form });

                ordersApi.complete(form, (response) => {
                    const order = response.data.data;

                    router.push(`/orders/result?updated_at=${order.updated_at}&merchant_uid=${order.merchant_uid}&buyer_name=${order.buyer_name}`);
                }, (error) => {
                    alert("결제에 실패하였습니다. 문의해 주시기 바랍니다.");
                })
            } else {
                let msg = response.error_msg;

                alert(msg);
            }
        });
    }


    // 요청사항 직접 입력
    const [isCustom, setIsCustom] = useState(false);
    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            setIsCustom(true);
            setForm({ ...form, delivery_request: '' });
        } else {
            setIsCustom(false);
            setForm({ ...form, delivery_request: value });
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, delivery_request: e.target.value });
    };



    return (
        <>
            <Header />
            <div className="body">
                {
                    order && isClient &&
                    <>
                        {/* 배송지 팝업 */}
                        {
                            isPopupOrdersDeliveryAddresses ?
                                <PopupOrdersDeliveryAddresses
                                    setForm={setForm}
                                    isPopup={isPopupOrdersDeliveryAddresses}
                                    setIsPopup={setIsPopupOrdersDeliveryAddresses}
                                />
                                : null
                        }

                        <div className="buy-cart-items-btn-wrap">
                            <p className="price">{totalFinalPrice.toLocaleString()}원</p>
                            <button onClick={() => { update() }} className="buy-cart-items-btn">
                                결제하기
                            </button>
                        </div>

                        <section className="bd-bt">
                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">주문자</p>
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="text"
                                            name="buyer_name"
                                            value={form.buyer_name}
                                            onChange={changeForm}
                                            placeholder="주문자명을 입력해주세요."
                                        />
                                    </div>
                                    <Error name={'buyer_name'} />
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="text" // number 대신 text로 변경
                                            name="buyer_contact"
                                            value={form.buyer_contact}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                                                if (value.length <= 11) {
                                                    changeForm({ target: { name: "buyer_contact", value } }); // 11자리까지만 업데이트
                                                }
                                            }}
                                            placeholder="휴대폰번호를 입력해주세요. (“-“제외)"
                                        />
                                    </div>
                                    <Error name={'buyer_contact'} />
                                </div>
                            </div>

                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">배송지</p>
                                    {
                                        user
                                        &&
                                        <button className="change-address-btn" onClick={() => { setIsPopupOrdersDeliveryAddresses(true) }}>
                                            배송지 변경 <i className="xi-angle-right-min"></i>
                                        </button>
                                    }
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="text"
                                            name="delivery_name"
                                            value={form.delivery_name}
                                            onChange={changeForm}
                                            placeholder="수령인 이름을 입력해주세요."
                                        />
                                    </div>
                                    <Error name={'delivery_name'} />
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="text" // number 대신 text로 변경
                                            name="delivery_phone"
                                            value={form.delivery_phone}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
                                                if (value.length <= 11) {
                                                    changeForm({ target: { name: "delivery_phone", value } }); // 11자리까지만 업데이트
                                                }
                                            }}
                                            placeholder="휴대폰번호를 입력해주세요. (“-“제외)"
                                        />
                                    </div>
                                    <Error name={'delivery_phone'} />
                                </div>
                                <div className="address-input-wrap-type1">
                                    <AddressInput form={form} setForm={setForm} addressType={"delivery"} />
                                </div>
                                <div>
                                    <div className="select-box-type1">
                                        <select
                                            name="delivery_request"
                                            value={isCustom ? 'custom' : form.delivery_request}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">배송시 요청사항을 선택해주세요.</option>
                                            <option value="빠른배송 부탁드립니다.">빠른배송 부탁드립니다.</option>
                                            <option value="현관에 두고 연락주세요.">현관에 두고 연락주세요.</option>
                                            <option value="custom">직접 입력</option>
                                        </select>
                                        <i className="xi-angle-down"></i>
                                    </div>
                                    {isCustom && (
                                        <div className="input-txt-box-type1">
                                            <input
                                                type="text"
                                                placeholder="요청사항을 입력해주세요."
                                                value={form.delivery_request}
                                                onChange={handleInputChange}
                                                className="custom-request-input"
                                            />
                                        </div>
                                    )}
                                    <Error name="delivery_request" />
                                </div>
                            </div>

                            {user ? (
                                <div className="input-list-type2 pt-20 px-20">
                                    <div className="input-list-title-wrap">
                                        <p className="input-list-title">쿠폰사용</p>
                                    </div>
                                    <div>
                                        <div className="select-box-type1">
                                            <select
                                                name="user_coupon_id"
                                                value={form.user_coupon_id}
                                                onChange={(e) => {
                                                    const selectedCouponId = e.target.value;
                                                    const selectedCoupon = userCoupons.find(userCoupon => userCoupon.user_coupon_id == selectedCouponId);

                                                    setForm((prevForm) => ({
                                                        ...prevForm,
                                                        user_coupon_id: selectedCouponId,
                                                        user_coupon_discount_amount: selectedCoupon?.type == "amount" ? selectedCoupon.discount_amount : "",
                                                        user_coupon_discount_rate: selectedCoupon?.type == "rate" ? selectedCoupon.discount_rate : "",
                                                        user_coupon_usage_limit_amount: selectedCoupon?.type == "rate" ? selectedCoupon.usage_limit_amount : "",
                                                    }));
                                                }}
                                            >
                                                <option value="">쿠폰을 선택해 주세요.</option>
                                                {userCoupons.map((userCoupon) => (
                                                    <option key={userCoupon.user_coupon_id} value={userCoupon.user_coupon_id}>
                                                        {userCoupon.name}
                                                        {/* {
                                                            userCoupon.type == "rate" ?
                                                            ` ${userCoupon.discount_rate}% 할인`
                                                            : 
                                                            ` ${userCoupon.discount_amount.toLocaleString()}원 할인`
                                                        } */}
                                                    </option>
                                                ))}
                                            </select>
                                            <i className="xi-angle-down"></i>
                                        </div>
                                        <Error name={'user_coupon_id'} />
                                        <Error name={'coupon_discount_amount'} />
                                    </div>
                                </div>
                            ) : null}


                            {user ? (
                                <div className="input-list-type2 pt-20 pb-20 px-20">
                                    <div className="input-list-title-wrap">
                                        <p className="input-list-title">적립금</p>
                                    </div>
                                    <div>
                                        <div className="input-txt-box-type1">
                                            <input
                                                type="text"
                                                name="use_points"
                                                value={form.use_points}
                                                onChange={(e) => {
                                                    // 숫자만 허용
                                                    let value = e.target.value.replace(/[^0-9]/g, "");
                                                    let numericValue = parseInt(value, 10) || 0;

                                                    const couponDiscount = totalCouponDiscount || 0;

                                                    // 💡 최종 결제 금액이 최소 1000원은 되도록
                                                    const maxUsable = Math.max(
                                                        0,
                                                        Math.min(
                                                            user.points,
                                                            totalOriginalPrice - totalDiscountPrice - couponDiscount + order.delivery_fee - 1000
                                                        )
                                                    );

                                                    if (numericValue > maxUsable) {
                                                        numericValue = maxUsable;
                                                    }

                                                    setForm({
                                                        ...form,
                                                        use_points: numericValue,
                                                    });
                                                }}
                                                placeholder="적립금"
                                            />
                                        </div>
                                        <Error name="use_points" />
                                    </div>
                                    <div className="input-list-sub-title-wrap mt-10">
                                        <p className="input-list-sub-title">
                                            사용가능 적립금 <span>{user.points?.toLocaleString() || 0}원</span>
                                        </p>
                                    </div>
                                </div>
                            ) : null}

                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">공동현관 출입방법</p>
                                </div>
                                <div>
                                    <div className="select-box-type1">
                                        <select
                                            name="common_entrance_method"
                                            value={form.common_entrance_method}
                                            onChange={changeForm}
                                        >
                                            <option value="">출입방법을 선택해 주세요.</option>
                                            <option value="공동현관 비밀번호 입력">공동현관 비밀번호 입력</option>
                                            <option value="인터폰 호출">인터폰 호출</option>
                                            <option value="수동 출입">수동 출입</option>
                                        </select>
                                        <i className="xi-angle-down"></i>
                                    </div>
                                    <Error name={'common_entrance_method'} />
                                </div>
                                {
                                    form.common_entrance_method == "공동현관 비밀번호 입력" ? (
                                        <div>
                                            <div className="input-txt-box-type1">
                                                <input
                                                    type="text"
                                                    name="common_entrance_password"
                                                    value={form.common_entrance_password}
                                                    onChange={changeForm}
                                                    placeholder="공동현관 비밀번호 입력해주세요."
                                                />
                                            </div>
                                            <Error name="common_entrance_password" />
                                        </div>
                                    ) : null
                                }

                            </div>

                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">주의사항</p>
                                </div>
                                <div>
                                    <div className="info-message-type2">
                                        <p className="mb-20 info-message-txt">
                                            다음의 경우 공동현관 앞 또는 경비실 앞으로 배송이 될 수 있습니다. 이로 인한 상품의 분실 및 파손은
                                            책임지지 않습니다.
                                        </p>
                                        <ul className="info-message-list">
                                            <li>
                                                <div className="num">01.</div>
                                                <p>입력해 주신 비밀번호가 없거나 일치하지 않는 경우.</p>
                                            </li>
                                            <li>
                                                <div className="num">02.</div>
                                                <p>기기 오작동 또는 경비원의 부재로 공동현관 출입이 원활하지 않을 경우.</p>
                                            </li>
                                            <li>
                                                <div className="num">03.</div>
                                                <p>6층 이상의 배송지 건물에 엘리베이터가 없거나 오작동하여 이용할 수 없는 경우.</p>
                                            </li>
                                            <li>
                                                <div className="num">04.</div>
                                                <p>기타 공동현관 출입이 불가하여 자택 앞으로 배송할 수 없는 경우.</p>
                                            </li>
                                            <li>
                                                <div className="num">05.</div>
                                                <p>비밀번호는 배송 목적으로만 사용 후 안전하게 폐기합니다.</p>
                                            </li>
                                            <li>
                                                <div className="num">06.</div>
                                                <p>공동현관 출입 방법을 정확하게 입력해 주세요.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* <section className="bd-bt">
                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">배송일</p>
                                </div>
                                <div>
                                    <div className="radiobox-list-type1">
                                        <label className="option">
                                            <input type="radio" name="delivery" value="default" defaultChecked />
                                            <span>기본배송</span>
                                        </label>
                                        <label className="option selected">
                                            <input type="radio" name="delivery" value="scheduled" />
                                            <span>지정일 배송</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div className="input-txt-box-type1">
                                            <input type="date" name="delivery_date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-list-title-wrap mt-10">
                                    <p className="input-list-title">주의사항</p>
                                </div>
                                <div>
                                    <div className="info-message-type2">
                                        <ul className="info-message-list">
                                            <li>
                                                <div className="num">01.</div>
                                                <p>주문일 기준 2일 이후부터 선택 가능합니다.</p>
                                            </li>
                                            <li>
                                                <div className="num">02.</div>
                                                <p>
                                                    오늘On 배송 상품의 경우 토요일 도착으로 지정 시 새벽 배송으로 진행되어,
                                                    <br />
                                                    토요일 아침 7시 전 도착합니다.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section> */}

                        <section className="bd-bt pt-20 pb-20">
                            <div className="agreement-checkbox-list px-20">
                                <div className="agreement-checkbox-list-all">
                                    <div className="checkbox-type1">
                                        <input
                                            type="checkbox"
                                            name="agreeAll"
                                            id="agreeAll"
                                            checked={
                                                form.agreeTerms
                                                &&
                                                form.agreePrivacy
                                                // &&
                                                // form.agreePayment
                                            }
                                            onChange={(e) => {
                                                const { checked } = e.target;
                                                setForm({
                                                    ...form,
                                                    agreeTerms: checked,
                                                    agreePrivacy: checked,
                                                    // agreePayment: checked,
                                                    // agree_promotion_sms: checked,
                                                });
                                            }}
                                        />
                                        <label htmlFor="agreeAll">전체 동의하기</label>
                                    </div>
                                </div>
                                <ul>
                                    <li>
                                        <div className="checkbox-type1">
                                            <input
                                                type="checkbox"
                                                name="agreeTerms"
                                                id="agreeTerms"
                                                checked={form.agreeTerms}
                                                onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                                            />
                                            <label htmlFor="agreeTerms">[필수] 개인정보처리 동의</label>
                                        </div>
                                        <Link href="/contents/privacyPolicy">상세보기</Link>
                                    </li>
                                    <li>
                                        <div className="checkbox-type1">
                                            <input
                                                type="checkbox"
                                                name="agreePrivacy"
                                                id="agreePrivacy"
                                                checked={form.agreePrivacy}
                                                onChange={(e) => setForm({ ...form, agreePrivacy: e.target.checked })}
                                            />
                                            <label htmlFor="agreePrivacy">[필수] 이용약관 동의</label>
                                        </div>
                                        <Link href="/contents/termsOfService">상세보기</Link>
                                    </li>
                                    {/* <li>
                                        <div className="checkbox-type1">
                                            <input
                                                type="checkbox"
                                                name="agreePayment"
                                                id="agreePayment"
                                                checked={form.agreePayment}
                                                onChange={(e) => setForm({ ...form, agreePayment: e.target.checked })}
                                            />
                                            <label htmlFor="agreePayment">[필수] 전자결제대행 이용 동의</label>
                                        </div>
                                        <a href="">상세보기</a>
                                    </li> */}
                                </ul>
                            </div>
                        </section>

                        <section className="bd-bt">
                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">결제수단</p>
                                </div>
                                <div>
                                    <div className="radiobox-list-type2 mb-20">
                                        <div className="radiobox">
                                            <input
                                                type="radio"
                                                id="card"
                                                name="pay_method_method"
                                                value="card"
                                                checked={form.pay_method_method == "card"}
                                                onChange={changeForm}
                                            />
                                            <label htmlFor="card">카드결제</label>
                                        </div>
                                        <div className="radiobox">
                                            <input
                                                type="radio"
                                                id="trans"
                                                name="pay_method_method"
                                                value="trans"
                                                checked={form.pay_method_method == "trans"}
                                                onChange={changeForm}
                                            />
                                            <label htmlFor="trans">계좌이체</label>
                                        </div>
                                    </div>
                                    <Error name={'pay_method_method'} />
                                </div>
                            </div>
                        </section>


                        <section className="bd-bt pt-20 pb-20">
                            <div className="price-information-list mb-20 px-20">
                                <ul>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">상품금액</p>
                                            <p className="price">{safeToLocaleString(totalOriginalPrice)}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">할인금액</p>
                                            <p className="price minus">-{safeToLocaleString(totalDiscountAmount)}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information sub">
                                            <p className="label">가격인하/할인</p>
                                            <p className="price minus">-{safeToLocaleString(totalDiscountPrice)}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information sub">
                                            <p className="label">상품쿠폰</p>
                                            <p className="price minus">-{safeToLocaleString(totalCouponDiscount)}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information sub">
                                            <p className="label">적립금 사용</p>
                                            <p className="price minus">-{safeToLocaleString(totalPointsUsed)}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">배송비</p>
                                            <p className="price">{safeToLocaleString(order.delivery_fee)}원</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="price-information final">
                                    <p className="label">총 상품금액</p>
                                    <p className="price">{safeToLocaleString(totalFinalPrice)}원</p>
                                </div>
                            </div>
                        </section>
                    </>
                }

            </div>
        </>
    );
}
