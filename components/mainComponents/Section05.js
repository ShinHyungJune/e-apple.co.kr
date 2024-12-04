import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import ProductItemType2 from "../library/ProductItemType2";
import ProductItemType3 from "../library/ProductItemType3";
export default function Section05() {

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
        <section className="pt-40 mb-60">
            <div className="section-title-wrap-type1">
                <p className="section-title">이달의 추천 상품</p>
            </div>

            <div className="tab-menu-type1">
                <ul>
                    <li>국산</li>
                    <li className="active">수입</li>
                    <li>제철</li>
                    <li>가공품</li>
                    <li>대용량</li>
                    <li>소용량</li>
                </ul>
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}