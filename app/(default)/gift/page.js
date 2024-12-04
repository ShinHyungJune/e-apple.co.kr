"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

import Swiper from "swiper";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import MainTabMenu from "@/components/library/MainTabMenu";
import NoListData from "@/components/NoListData";
import ProductItemType1 from "@/components/library/ProductItemType1";
import ProductItemType2 from "@/components/library/ProductItemType2";
import ProductItemType3 from "@/components/library/ProductItemType3";


import productsApi from "@/lib/api/productsApi";


export default function Start() {
    const router = useRouter();
    const [isFirstRender, setIsFirstRender] = useState(true);

    // 가격대별 인기 선물 form
    const [priceProductsForm, setPriceProductsForm] = useState({
        page: 1,
        min_price: "",
        max_price: "",
    });
    // 가격대별 인기 선물 상품 리스트
    const [priceProducts, setPriceProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    // 어느분에게 선물하시나요? from
    const [giftProductsForm, setGiftProductsForm] = useState({
        page: 1,
        tags: ["클래식 과일"],
    });
    // 가격대별 인기 선물 상품 리스트
    const [giftProducts, setGiftProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    // md 추천 선물 상품
    const [mdGiftProducts, setMdGiftProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });




    // 가격대별 인기 선물 api
    useEffect(() => {
        getPriceProducts()
    }, [priceProductsForm])
    function getPriceProducts() {
        productsApi.index("gift", priceProductsForm, (response) => {
            setPriceProducts(response.data);
        })
    }


    // 어느분에게 선물하시나요? api
    useEffect(() => {
        getGiftProducts()
    }, [giftProductsForm])
    function getGiftProducts() {
        const params = new URLSearchParams();

        // `giftProductsForm` 데이터를 쿼리 파라미터로 변환
        params.append("page", giftProductsForm.page);
        giftProductsForm.tags.forEach((tag) => {
            params.append("tags[]", tag); // tags 배열을 `tags[]` 형식으로 추가
        });

        // API 호출
        productsApi.index(`gift?${params.toString()}`, {}, (response) => {
            setGiftProducts(response.data);
        });
    }


    // md 추천 선물 상품 api
    useEffect(() => {
        getMdGiftProducts()
    }, [])
    function getMdGiftProducts() {
        productsApi.index("md_suggestion_gift", {}, (response) => {
            setMdGiftProducts(response.data);
        })
    }



    const handlePriceFilterClick = (min, max) => {
        setPriceProductsForm((prev) => ({
            ...prev,
            min_price: min,
            max_price: max,
        }));
    };




    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            if (swiper) {
                swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
            }
            swiper = new Swiper(".mySwiper3", {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
            });
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, []);

    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="선물" />

                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">가격대별 인기 선물</p>
                    </div>
                    <div className="tab-menu-type1">
                        <ul>
                            <li
                                className={!priceProductsForm.min_price && !priceProductsForm.max_price ? "active" : ""}
                                onClick={() => handlePriceFilterClick("", "")}
                            >
                                전체
                            </li>
                            <li
                                className={priceProductsForm.min_price === "0" && priceProductsForm.max_price === "40000" ? "active" : ""}
                                onClick={() => handlePriceFilterClick("0", "40000")}
                            >
                                4만원대 이하
                            </li>
                            <li
                                className={priceProductsForm.min_price === "50000" && priceProductsForm.max_price === "70000" ? "active" : ""}
                                onClick={() => handlePriceFilterClick("50000", "70000")}
                            >
                                5-7만원
                            </li>
                            <li
                                className={priceProductsForm.min_price === "80000" && priceProductsForm.max_price === "90000" ? "active" : ""}
                                onClick={() => handlePriceFilterClick("80000", "90000")}
                            >
                                8-9만원
                            </li>
                            <li
                                className={priceProductsForm.min_price === "100000" ? "active" : ""}
                                onClick={() => handlePriceFilterClick("100000", "")}
                            >
                                10만원 이상
                            </li>
                        </ul>
                    </div>
                    <div className="item-list-type1">
                        {priceProducts.data.length > 0 ? (
                            <ul>
                                {priceProducts.data.slice(0, 4).map((priceProduct, index) => (
                                    <li key={priceProduct.id}>
                                        <ProductItemType1 product={priceProduct} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoListData message="상품이 없습니다." />
                        )}
                    </div>
                    <div className="view-all-btn-wrap">
                        <Link href="/" className="view-all-btn-type1">
                            전체보기 <i className="xi-angle-right-min"></i>
                        </Link>
                    </div>
                </section>

                <section className="mb-60">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">어느분에게 선물하시나요?</p>
                    </div>
                    <div className="tab-menu-type1">
                        <ul>
                            <li
                                className={giftProductsForm.tags.includes("실시간 인기") ? "active" : ""}
                                onClick={() =>
                                    setGiftProductsForm((prev) => ({ ...prev, tags: ["실시간 인기"] }))
                                }
                            >
                                실시간 인기
                            </li>
                            <li
                                className={giftProductsForm.tags.includes("클래식 과일") ? "active" : ""}
                                onClick={() =>
                                    setGiftProductsForm((prev) => ({ ...prev, tags: ["클래식 과일"] }))
                                }
                            >
                                클래식 과일
                            </li>
                            <li
                                className={giftProductsForm.tags.includes("어른을 위한 픽") ? "active" : ""}
                                onClick={() =>
                                    setGiftProductsForm((prev) => ({ ...prev, tags: ["어른을 위한 픽"] }))
                                }
                            >
                                어른을 위한 픽
                            </li>
                            <li
                                className={giftProductsForm.tags.includes("추가 증정") ? "active" : ""}
                                onClick={() =>
                                    setGiftProductsForm((prev) => ({ ...prev, tags: ["추가 증정"] }))
                                }
                            >
                                추가 증정
                            </li>
                        </ul>
                    </div>
                    <div className="item-list-type1">
                        {giftProducts.data.length > 0 ? (
                            <ul>
                                {giftProducts.data.slice(0, 4).map((priceProduct, index) => (
                                    <li key={priceProduct.id}>
                                        <ProductItemType1 product={priceProduct} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoListData message="상품이 없습니다." />
                        )}
                    </div>
                    <div className="view-all-btn-wrap">
                        <Link href="/" className="view-all-btn-type1">
                            전체보기 <i className="xi-angle-right-min"></i>
                        </Link>
                    </div>
                </section>

                <section className="mb-60">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">MD 추천 선물</p>
                    </div>

                    <div className="swiper-type3 mb-40">
                        <div className="swiper mySwiper3">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <ProductItemType2 />

                                    <div className="item-list-type3 mt-40">
                                        <ul>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <ProductItemType2 />

                                    <div className="item-list-type3 mt-40">
                                        <ul>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                            <li>
                                                <ProductItemType3 />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
