"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import cartsApi from "@/lib/api/cartsApi";
import CartItemType1 from "@/components/library/CartItemType1";

export default function page() {
    const router = useRouter();

    // const[selectedIds, setSelectedIds] = useState([]);

    const [form, setForm] = useState({
        page: 1,
    });
    const [carts, setCarts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        cartsIndex()
    }, [form])
    function cartsIndex() {
        cartsApi.index(form, (response) => {
            setCarts(response.data);
            console.log(response.data);
        })
    }


    const destroy = () => {
        cartsApi.destroy({
            ids: []
        }, (response) => {
            console.log(response)
        });
    }


    return (
        <>
            <Header />

            <div className="body">
                {/* 총 구매 버튼 */}
                <div className="buy-cart-items-btn-wrap">
                    <p className="price">205,500원</p>
                    <a href="order.html" className="buy-cart-items-btn">
                        총 2개 구매하기
                    </a>
                </div>

                <section>
                    {/* 상단 바 */}
                    <div className="cart-top-bar">
                        <div className="cart-top-bar-le">
                            <div className="checkbox-type1 px16">
                                <input type="checkbox" id="checkbox-01" />
                                <label htmlFor="checkbox-01">전체선택</label>
                            </div>
                            <button className="cart-top-btn">선택삭제</button>
                            <button className="cart-top-btn">품절삭제</button>
                        </div>
                    </div>

                    {/* 장바구니 목록 */}
                    <div className="cart-item-list-type1">
                        {
                            carts.data.length > 0 ? (
                                <ul>
                                    {
                                        carts.data.map((cart) => {
                                            return (
                                                <li key={cart.id}>
                                                    <CartItemType1 cart={cart} />
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            ) : (<NoListData message={"장바구니에 담은 상품이 없습니다."} />)
                        }
                    </div>

                    {/* 가격 정보 */}
                    <div className="price-information-list mb-20 px-20">
                        <ul>
                            <li>
                                <div className="price-information">
                                    <p className="label">상품금액</p>
                                    <p className="price">199,500원</p>
                                </div>
                            </li>
                            <li>
                                <div className="price-information">
                                    <p className="label">할인금액</p>
                                    <p className="price minus">-9,430원</p>
                                </div>
                            </li>
                            <li>
                                <div className="price-information sub">
                                    <p className="label">가격인하/할인</p>
                                    <p className="price minus">-6,500원</p>
                                </div>
                            </li>
                            <li>
                                <div className="price-information">
                                    <p className="label">배송비</p>
                                    <p className="price">6,000원</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
