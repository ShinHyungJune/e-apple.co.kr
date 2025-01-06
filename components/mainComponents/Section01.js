import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
export default function Section01({ banners = [] }) {



    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            if (swiper) {
                swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
            }
            swiper = new Swiper(".mySwiperBanners", {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
            });
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, [banners]);

    if (banners.length > 0)
    return (
        <section className="mb-70">
            <div className="swiper-type1">
                <div className="swiper mySwiperBanners">
                    <div className="swiper-wrapper">
                        {banners.map((banner, index) => (
                            <div key={index} className="swiper-slide">
                                <Link href={banner.url ? banner.url : "/"} className="content-box">
                                    <div className="bg-wrap">
                                        <img src={banner.img.url} alt="" />
                                    </div>
                                    <div className="txt-wrap">
                                        <p className="txt-top" style={{wordBreak:'break-word'}}>{banner.title}</p>
                                        <p className="txt-bt" style={{wordBreak:'break-word'}}>{banner.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}