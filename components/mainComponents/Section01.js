import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
export default function Section01({ banners = [] }) {
    const swiperRef = useRef(null);

    useEffect(() => {
        // 기존 Swiper 인스턴스가 있으면 삭제
        if (swiperRef.current && swiperRef.current.destroy) {
            try {
                swiperRef.current.destroy(true, true);
                swiperRef.current = null;
            } catch (e) {
                console.error("Failed to destroy existing swiper:", e);
            }
        }

        // 새 Swiper 인스턴스 생성
        if (banners.length > 0) {
            swiperRef.current = new Swiper(".mySwiperBanners", {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
            });
        }

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiperRef.current && swiperRef.current.destroy) {
                try {
                    swiperRef.current.destroy(true, true);
                    swiperRef.current = null;
                } catch (e) {
                    console.error("Failed to destroy swiper on unmount:", e);
                }
            }
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
                                        <img src={banner.img?.url ? banner.img?.url : ""} alt="" />
                                    </div>
                                    <div className="txt-wrap">
                                        <p className="txt-top">{banner.title}</p>
                                        <p className="txt-bt">{banner.description}</p>
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