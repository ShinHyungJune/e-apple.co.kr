"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import productsApi from "@/lib/api/productsApi";

export default function page() {
    const router = useRouter();


    // const [form, setForm] = useState({
    //     page: 1,
    // });
    // const [products, setProducts] = useState({
    //     data: [],
    //     meta: {
    //         current_page: 1,
    //         last_page: 1,
    //         total: 0,
    //     },
    // });

    // useEffect(() => {
    //     ProductsIndex()
    // }, [form])
    // function ProductsIndex() {
    //     productsApi.index("best", form, (response) => {
    //         setProducts(response.data);
    //     })
    // }



    return (
        <>
            <Header />

            <div className="body">
                <div className="btn-wrap-fixed">
                    <button className="btn wht">기본 배송지 설정</button>
                    <button className="btn org">새 배송지 등록</button>
                </div>
                <section className="pt-30">
                    <div className="address-list-wrap-type1 px-20">
                        <ul>
                            <li>
                                <div className="address-item-type1 active">
                                    <div className="address-name-wrap">
                                        <p className="address-name">
                                            배송지 명
                                            <span className="default">기본배송지</span>
                                        </p>
                                        <button className="add-option-btn">수정하기</button>
                                    </div>
                                    <div className="address-wrap">
                                        <p className="address">
                                            서울특별시 가나구 다라로 123-4번지 108호
                                        </p>
                                    </div>
                                    <div className="user-name-num-wrap">
                                        <p className="user-name">김철수</p>
                                        <p className="user-num">010-0000-0000</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="address-item-type1">
                                    <div className="address-name-wrap">
                                        <p className="address-name">배송지 명</p>
                                        <button className="add-option-btn">수정하기</button>
                                    </div>
                                    <div className="address-wrap">
                                        <p className="address">
                                            서울특별시 가나구 다라로 123-4번지 108호
                                        </p>
                                    </div>
                                    <div className="user-name-num-wrap">
                                        <p className="user-name">김철수</p>
                                        <p className="user-num">010-0000-0000</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
