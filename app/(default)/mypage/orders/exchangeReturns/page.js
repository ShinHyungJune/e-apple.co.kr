"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import Header from "@/components/Header";
import ordersApi from "@/lib/api/ordersApi";
import exchangeReturnsApi from "@/lib/api/exchangeReturnsApi";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const order_id = searchParams.get('order_id');
    const order_product_id = searchParams.get('order_product_id');
    const merchant_uid = searchParams.get('merchant_uid');
    const buyer_name = searchParams.get('buyer_name');


    const [orderProduct, setOrderProduct] = useState(null);

    const [form, setForm] = useState({
        order_id: order_id,
        order_product_id: order_product_id,
        problem: "",
        description: "",
    });



    useEffect(() => {
        if (order_product_id) {
            ordersApi.show_order_products(order_product_id, (response) => {
                setOrderProduct(response.data.data);
            });
        }
    }, [searchParams])


    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const store = (type) => {
        const updatedForm = { ...form, type: type }; // type을 form에 추가
        exchangeReturnsApi.store(updatedForm, (response) => {
            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            router.push(`/mypage/orders/exchangeReturns/result?merchant_uid=${merchant_uid}&buyer_name=${buyer_name}&updated_at=${formattedDate}&type=${type}`);
        });
    };
        return (
            <>
                <Header subTitle={'교환/반품'} />

                <div className="body">
                    {
                        orderProduct &&
                        <>
                            <div className="btn-wrap-fixed">
                                <button className="btn" onClick={() => { store("exchange") }}>교환요청</button>
                                <button className="btn" onClick={() => { store("return") }}>반품요청</button>
                            </div>

                            <section>
                                <div className="order-product-type1 px-20 pb-20 bd-bt-sm">
                                    <div className="item-img-wrap ratio-box">
                                        <img src={orderProduct.product.img.url} alt={orderProduct.product.name} />
                                    </div>
                                    <div className="item-content-wrap">
                                        <p className="item-title">{orderProduct.product.name}</p>
                                        <p className="item-option">{orderProduct.productOption.name}</p>
                                        <div className="item-count-amount-wrap">
                                            <p className="item-count">수량 {orderProduct.quantity}개</p>
                                            <p className="item-amount">{orderProduct.price.toLocaleString()}원</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-list-type2 pb-20 px-20">
                                    <div className="input-list-title-wrap">
                                        <p className="input-list-title">어떤 문제가 있나요?</p>
                                    </div>
                                    <div>
                                        <div className="radiobox-list-type2 mb-20">
                                            <h3 className="radiobox-title">단순변심</h3>
                                            {["상품이 마음에 들지 않음", "더 저렴한 상품을 발견함"].map((item) => (
                                                <div className="radiobox" key={item}>
                                                    <input
                                                        type="radio"
                                                        id={item}
                                                        name="problem"
                                                        value={item}
                                                        checked={form.problem === item}
                                                        onChange={changeForm}
                                                    />
                                                    <label htmlFor={item}>{item}</label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="radiobox-list-type2 mb-20">
                                            <h3 className="radiobox-title">배송문제</h3>
                                            {["다른 상품이 배송됨", "배송된 장소에서 박스가 분실됨", "다른 주소로 배송됨"].map((item) => (
                                                <div className="radiobox" key={item}>
                                                    <input
                                                        type="radio"
                                                        id={item}
                                                        name="problem"
                                                        value={item}
                                                        checked={form.problem === item}
                                                        onChange={changeForm}
                                                    />
                                                    <label htmlFor={item}>{item}</label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="radiobox-list-type2">
                                            <h3 className="radiobox-title">상품문제</h3>
                                            {["상품의 구성품/부속품이 들어있지 않음", "상품이 설명과 다름", "상품이 파손되어 배송됨", "상품 결함/기능에 이상이 있음"].map((item) => (
                                                <div className="radiobox" key={item}>
                                                    <input
                                                        type="radio"
                                                        id={item}
                                                        name="problem"
                                                        value={item}
                                                        checked={form.problem === item}
                                                        onChange={changeForm}
                                                    />
                                                    <label htmlFor={item}>{item}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <Error name={'problem'} />
                                    </div>
                                </div>

                                <div className="input-list-type2 pt-20 pb-20 px-20">
                                    <div className="input-list-title-wrap">
                                        <p className="input-list-title">상세설명</p>
                                    </div>
                                    <div>
                                        <div className="textarea-box-type1">
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows="10"
                                                placeholder="상세내용을 입력해주세요."
                                                value={form.description} // 상태와 연결
                                                onChange={changeForm} // 입력 값 업데이트
                                            ></textarea>
                                        </div>
                                        <Error name={'description'} />
                                    </div>
                                </div>
                            </section>
                        </>
                    }

                </div>
            </>
        );
}