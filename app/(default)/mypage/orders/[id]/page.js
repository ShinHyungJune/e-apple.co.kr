"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";

import ordersApi from "@/lib/api/ordersApi";

import OrderProductType1 from "@/components/library/OrderProductType1";

export default function page(props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = props.params.id;
    const buyer_name = searchParams.get('buyer_name');
    const merchant_uid = searchParams.get('merchant_uid');


    const [order, setOrder] = useState();

    useEffect(() => {
        show()
    }, [orderId])
    function show() {
        if (orderId == "guest") {
            ordersApi.show(orderId, {
                buyer_name: buyer_name,
                merchant_uid: merchant_uid
            }, (response) => {
                setOrder(response.data.data);
            })
        } else {
            ordersApi.show(orderId, {}, (response) => {
                setOrder(response.data.data);
            })
        }
    }



    const {
        totalOriginalPrice,    // 총 상품 금액: original_price * quantity의 합
        totalDiscountPrice,    // 총 상품 자체 할인 금액: (original_price - price) * quantity의 합
    } = useMemo(() => {
        if (!order) {
            // order가 없으면 기본값 반환
            return {
                totalOriginalPrice: 0,
                totalDiscountPrice: 0,
                totalCouponDiscount: 0,
                totalPointsUsed: 0,
                totalFinalPrice: 0,
                totalDiscountAmount: 0,
            };
        }

        let totalOriginalPrice = 0; // 총 상품 금액
        let totalDiscountPrice = 0; // 총 상품 자체 할인 금액

        // 상품금액과 가격인하/할인 계산
        order.orderProducts.forEach((product) => {
            const { quantity, productOption } = product;
            totalOriginalPrice += productOption.original_price * quantity;
            totalDiscountPrice += (productOption.original_price - productOption.price) * quantity;
        });



        return {
            totalOriginalPrice,
            totalDiscountPrice,
        };
    }, [order]); // form도 의존성에 추가



    return (
        <>
            <Header subTitle={'주문/배송 조회'} />

            <div className="body">

                {
                    order &&
                    <>
                        <section className="mb-60">
                            <div className="order-item-type1 mb-60">
                                <div className="order-num">
                                    {
                                        order.merchant_uid ?
                                            <Link href={`/mypage/orders/${order.id}`}>
                                                {order.merchant_uid} <i className="xi-angle-right"></i>
                                            </Link>
                                            : <div></div>
                                    }
                                    {['주문접수', '주문완료', '결제대기중', '결제완료', '배송준비중'].includes(order.status) && (
                                        <button className="order-product-btn">주문취소</button>
                                    )}
                                </div>

                                <div className="order-product-list-type1">
                                    <ul>
                                        {
                                            order.orderProducts.map((orderProduct) => {
                                                {
                                                    return (
                                                        <li key={orderProduct.id}>
                                                            <OrderProductType1
                                                                order={order}
                                                                orderProduct={orderProduct}
                                                            />
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            {/* 주문자 정보 */}
                            <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <p className="price-information-title">주문자 정보</p>
                                <ul>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">주문자</p>
                                            <p className="price">{order.buyer_name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">휴대폰번호</p>
                                            <p className="price">{order.buyer_contact}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* 결제 정보 */}
                            <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <p className="price-information-title">결제 정보</p>
                                <ul>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">상품금액</p>
                                            <p className="price">{totalOriginalPrice.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">할인금액</p>
                                            <p className="price minus">
                                                -{(totalDiscountPrice + (order.coupon_discount || 0) + (order.use_points || 0)).toLocaleString()}원
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information sub">
                                            <p className="label">가격인하/할인</p>
                                            <p className="price minus">-{totalDiscountPrice.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                    {
                                        order.coupon_discount &&
                                        <li>
                                            <div className="price-information sub">
                                                <p className="label">상품쿠폰</p>
                                                <p className="price minus">-{order.coupon_discount.toLocaleString()}원</p>
                                            </div>
                                        </li>
                                    }
                                    {
                                        order.use_points == 0 &&
                                        <li>
                                            <div className="price-information sub">
                                                <p className="label">적립금 사용</p>
                                                <p className="price minus">-{order.use_points.toLocaleString()}원</p>
                                            </div>
                                        </li>
                                    }
                                    <li>
                                        <div className="price-information">
                                            <p className="label">배송비</p>
                                            <p className="price">{order.delivery_fee.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* 총 결제 정보 */}
                            <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <p className="price-information-title">결제 정보</p>
                                <ul>
                                    <li>
                                        <div className="price-information big">
                                            <p className="label">총 상품금액</p>
                                            <p className="price">{order.price.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">카드결제</p>
                                            <p className="price">{order.price.toLocaleString()} 원</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* 취소/환불 정보 */}
                            {/* <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <p className="price-information-title">취소/환불 정보</p>
                                <ul>
                                    <li>
                                        <div className="price-information big">
                                            <p className="label">원결제금액</p>
                                            <p className="price">48,587원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">상품금액</p>
                                            <p className="price">52,050원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">환불배송비</p>
                                            <p className="price">6,000원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">쿠폰할인</p>
                                            <p className="price">9,463원</p>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <ul>
                                    <li>
                                        <div className="price-information big">
                                            <p className="label">차감금액</p>
                                            <p className="price">0원</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">추가배송비</p>
                                            <p className="price">0원</p>
                                        </div>
                                    </li>
                                    {order.refund_delivery_fee ?
                                        <li>
                                            <div className="price-information">
                                                <p className="label">반품배송비</p>
                                                <p className="price">{order.refund_delivery_fee.toLocaleString()}원</p>
                                            </div>
                                        </li>
                                        : null}
                                </ul>
                            </div>

                            {order.refund_amount ?
                                <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                    <ul>
                                        <li>
                                            <div className="price-information big">
                                                <p className="label">환불금액</p>
                                                <p className="price">{order.refund_amount.toLocaleString()}원</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="price-information">
                                                <p className="label">카드환불</p>
                                                <p className="price">{order.refund_amount.toLocaleString()}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                : null}



                            {/* 배송지 정보 */}
                            <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                                <p className="price-information-title">배송지 정보</p>
                                <ul>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">받는사람</p>
                                            <p className="price">{order.delivery_name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">휴대폰번호</p>
                                            <p className="price">{order.delivery_phone}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">주소</p>
                                            <p className="price">
                                                {order.delivery_postal_code}
                                                {order.delivery_address}
                                                {order.delivery_address_detail}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">배송시 요청사항</p>
                                            <p className="price">{order.delivery_request}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* <div className="underline-btn-wrap mb-60">
                                <button className="underline-btn">영수증 보기</button>
                            </div> */}
                        </section>
                    </>
                }

            </div>
        </>
    );
}