import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
export default function Section03() {

    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            if (swiper) {
                swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
            }
            swiper = new Swiper(".mySwiper2", {
                slidesPerView: 3.5,
                spaceBetween: 10,
            });
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, []);

    return (
        <section className="mb-60">
            <div className="section-title-wrap-type1">
                <p className="section-title">오늘의 당도 체크</p>
                <p className="section-sub-title">12일(토) 06시 기준</p>
            </div>

            <div className="swiper-type2">
                <div className="swiper mySwiper2">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="sweetness-check-item">
                                <div className="img-wrap ratio-box">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">14</p>
                                    <p className="txt-ct">홍로사과</p>
                                    <p className="txt-bt">기준 14brix</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="sweetness-check-item">
                                <div className="img-wrap ratio-box">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">14</p>
                                    <p className="txt-ct">홍로사과</p>
                                    <p className="txt-bt">기준 14brix</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="sweetness-check-item">
                                <div className="img-wrap ratio-box">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">14</p>
                                    <p className="txt-ct">홍로사과</p>
                                    <p className="txt-bt">기준 14brix</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="sweetness-check-item">
                                <div className="img-wrap ratio-box">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">14</p>
                                    <p className="txt-ct">홍로사과</p>
                                    <p className="txt-bt">기준 14brix</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}