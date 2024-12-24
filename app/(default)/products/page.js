"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import ProductCategorys from "@/components/library/ProductCategorys";
import NoListData from "@/components/NoListData";
import ProductItemType1 from "@/components/library/ProductItemType1";
import Pagination from "@/components/Pagination";
import productsApi from "@/lib/api/productsApi";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();

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
                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type2">
                        <p className="section-title">국산 과일</p>
                    </div>

                    <ProductCategorys/>

                    <div className="filter-wrap-type1 px-20 mt-20">
                        <p className="total-count">총 63개</p>
                        <select name="" id="">
                            <option value="">추천순</option>
                            <option value="">신상품</option>
                            <option value="">높은가격순</option>
                            <option value="">낮은가격순</option>
                        </select>
                    </div>
                
                    <div className="item-list-type1 mt-20">
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
                    {
                        products.data.length > 0 ? (
                            <Pagination
                                form={form}
                                setForm={setForm}
                                meta={products.meta}
                            />
                        ) : null
                    }
                </section>
            </div>
        </>
    );
}
