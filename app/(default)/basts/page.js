"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import MainTabMenu from "@/components/library/MainTabMenu";
import NoListData from "@/components/NoListData";
import ProductItemType1 from "@/components/library/ProductItemType1";

import productsApi from "@/lib/api/productsApi";

export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({
        page: 1,
    });
    const [products, setProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    // 가격대별 인기 선물 api
    useEffect(() => {
        ProductsIndex()
    }, [form])
    function ProductsIndex() {
        productsApi.index("best", form, (response) => {
            setProducts(response.data);
        })
    }



    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="베스트" />

                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">베스트 20</p>
                    </div>
                    <div className="item-list-type1">
                        {
                            products.data.length > 0 ? (
                                <ul>
                                    {
                                        products.data.map((product)=>{
                                            return(
                                                <li key={product.id}>
                                                    <ProductItemType1 product={product}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (
                                <NoListData message="상품이 없습니다." />
                            )
                        }
                        
                    </div>
                </section>
            </div>
        </>
    );
}
