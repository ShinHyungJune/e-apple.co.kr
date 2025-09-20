import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import ProductItemType1 from "../library/ProductItemType1";
export default function Section06({Products=[]}) {
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
        if (Products.length > 0) {
            swiperRef.current = new Swiper(".mySwiperBestProducts", {
                slidesPerView: 2.3,
                spaceBetween: 10,
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
    }, [Products]);

    if(Products.length > 0)
    return (
        <section className="mb-60">
            <div className="section-title-wrap-type2">
                <p className="section-title">베스트 상품 모음</p>
                <Link href="/basts" className="view-all-btn-type2">
                    전체보기 <i className="xi-angle-right-min"></i>
                </Link>
            </div>

            <div className="swiper-type4">
                <div className="swiper mySwiperBestProducts">
                    <div className="swiper-wrapper">
                        {
                            Products.map((Product)=>{
                                return(
                                    <div key={Product.id} className="swiper-slide">
                                        <ProductItemType1 product={Product} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}