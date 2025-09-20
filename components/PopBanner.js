"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import popBannersApi from "@/lib/api/popBannersApi";
import Swiper from "swiper";

export default function PopBanner() {
    const [popBanners, setPopBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        fetchPopBanners();
        return () => {
            if (swiperRef.current && swiperRef.current.destroy) {
                try {
                    swiperRef.current.destroy(true, true);
                    swiperRef.current = null;
                } catch (e) {
                    console.error("Failed to destroy swiper:", e);
                }
            }
        };
    }, []);

    useEffect(() => {
        if (popBanners.length > 0 && isVisible) {
            // Destroy existing Swiper instance
            if (swiperRef.current && swiperRef.current.destroy) {
                try {
                    swiperRef.current.destroy(true, true);
                    swiperRef.current = null;
                } catch (e) {
                    console.error("Failed to destroy existing swiper:", e);
                }
            }

            // Create new Swiper instance after a short delay
            setTimeout(() => {
                swiperRef.current = new Swiper('.popBannerSwiper', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: popBanners.length > 1,
                    pagination: {
                        el: '.popBannerIndicators',
                        clickable: true,
                        bulletClass: 'popBannerDot',
                        bulletActiveClass: 'active',
                        renderBullet: function (index, className) {
                            return `<span class="${className}"></span>`;
                        },
                    },
                });
            }, 100);
        }

        return () => {
            if (swiperRef.current && swiperRef.current.destroy) {
                try {
                    swiperRef.current.destroy(true, true);
                    swiperRef.current = null;
                } catch (e) {
                    console.error("Failed to destroy swiper on cleanup:", e);
                }
            }
        };
    }, [popBanners, isVisible]);

    const fetchPopBanners = () => {
        popBannersApi.index({},
            (response) => {
                if (response.data && response.data.data) {
                    setPopBanners(response.data.data);
                    setIsVisible(response.data.data.length > 0);
                }
            },
            (error) => {
                console.error("Failed to fetch pop banners:", error);
            }
        );
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || popBanners.length === 0) return null;

    return (
        <div className="popBanner">
            <div className="popBannerContainer">
                {/* 상단 헤더 영역 */}
                <div className="popBannerHeader">
                    <button className="popBannerCloseBtn" onClick={handleClose}>
                        ×
                    </button>
                </div>

                {/* Swiper 배너 */}
                <div className="popBannerImage">
                    <div className="swiper popBannerSwiper">
                        <div className="swiper-wrapper">
                            {popBanners.map((banner, index) => (
                                <div key={index} className="swiper-slide">
                                    {banner.url ? (
                                        <Link href={banner.url}>
                                            <Image
                                                src={banner.img?.url || '/images/default-banner.png'}
                                                alt={banner.title}
                                                width={500}
                                                height={500}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block'
                                                }}
                                            />
                                        </Link>
                                    ) : (
                                        <Image
                                            src={banner.img?.url || '/images/default-banner.png'}
                                            alt={banner.title}
                                            width={500}
                                            height={500}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block'
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom pagination */}
                    {popBanners.length > 1 && (
                        <div className="popBannerIndicators"></div>
                    )}
                </div>

                {/* 오늘 하루 보지 않기 옵션 */}
                <div className="popBannerOption">
                    <button
                        className="popBannerTodayCloseBtn"
                        onClick={() => {
                            localStorage.setItem('popBannerClosed', new Date().toDateString());
                            handleClose();
                        }}
                    >
                        오늘 하루 보지 않기
                    </button>
                    <button className="popBannerCloseTextBtn" onClick={handleClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}