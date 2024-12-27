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
import categoriesApi from "@/lib/api/categoriesApi";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categorie, setCategorie] = useState();

    const [form, setForm] = useState({
        page: searchParams.get('page') || 1,
        order_column: searchParams.get("order_column") || "created_at",
        order_direction: searchParams.get("order_direction") || "desc",
        category_id: searchParams.get("category_id") || "",
        subcategory_id: searchParams.get("subcategory_id") || "",
    });

    // 상품 리스트
    const [products, setProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    const [isFirstRender, setIsFirstRender] = useState(true);

    // 페이지 초기화: page 외 값이 변경될 때만 실행
    useEffect(() => {
        if (isFirstRender) return setIsFirstRender(false);
    
        setForm({ ...form, page: "1" });
    }, [JSON.stringify({ ...form, page: undefined })]);

    // URL 동기화 및 상품 데이터 가져오기
    useEffect(() => {
        const queryString = new URLSearchParams(form).toString();
        window.history.replaceState(null, '', `?${queryString}`);
        indexProducts();
    }, [JSON.stringify({ ...form, })]);

    // 상품 목록 API 호출
    function indexProducts() {
        productsApi.index("", form, (response) => {
            setProducts(response.data);
        });
    }

    // URL 변경 시 form 상태 동기화
    useEffect(() => {
        setForm({
            ...form,
            category_id: searchParams.get('category_id') || "",
            subcategory_id: searchParams.get('subcategory_id') || "",
        });
    
        indexCategories()
    }, [searchParams]);


    function indexCategories() {
        const categorieId = searchParams.get('category_id'); // URL에서 categorie_id 가져오기
        categoriesApi.indexCategories({}, (response) => {
            const matchedCategorie = response.data.data.find(
                (item) => item.value == categorieId
            );
            setCategorie(matchedCategorie || ""); // 일치하는 항목이 없으면 null
        });
    }


    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type2">
                        <p className="section-title">{categorie?.text}</p>
                    </div>

                    <>
                        {categorie?.items && (
                            <div className="main-tab-menu scroll-hidden">
                                <div className="tab-menu-bar">
                                    {/* 전체 버튼 */}
                                    <button
                                        className={`tab-item ${form.subcategory_id == "" ? 'active' : ''}`}
                                        onClick={() => setForm((prevForm) => ({ ...prevForm, subcategory_id: "" }))}
                                    >
                                        전체
                                    </button>

                                    {/* 서브카테고리 버튼들 */}
                                    {categorie.items.map((subCategorie) => (
                                        <button
                                            key={subCategorie.value}
                                            className={`tab-item ${form.subcategory_id == subCategorie.value ? 'active' : ''}`}
                                            onClick={() =>
                                                setForm((prevForm) => ({ ...prevForm, subcategory_id: subCategorie.value }))
                                            }
                                        >
                                            {subCategorie.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>

                    <div className="filter-wrap-type1 px-20 mt-20">
                        <p className="total-count">총 {products.meta.total}개</p>
                        <select
                            name="order"
                            id="order"
                            value={`${form.order_column},${form.order_direction}`}
                            onChange={(e) => {
                                const [order_column, order_direction] = e.target.value.split(',');
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    order_column: order_column,
                                    order_direction: order_direction,
                                }));
                            }}
                        >
                            <option value="created_at,desc">신상품</option>
                            <option value="reviews_count,desc">리뷰 많은순</option>
                            <option value="price,desc">높은가격순</option>
                            <option value="price,asc">낮은가격순</option>
                        </select>
                    </div>

                    <div className="item-list-type1 mt-20">
                        {
                            products.data.length > 0 ? (
                                <ul>
                                    {
                                        products.data.map((product) => {
                                            return (
                                                <li key={product.id}>
                                                    <ProductItemType1 product={product} />
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
