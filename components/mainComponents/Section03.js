import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
export default function Section03({sweetness=[], standard_datetime}) {
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
        if (sweetness.length > 0) {
            swiperRef.current = new Swiper(".mySwiperSweetness", {
                slidesPerView: 3.5,
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
    }, [sweetness]);



    if (sweetness.length > 0)
    return (
        <section className="mb-60">
            <div className="section-title-wrap-type1">
                <p className="section-title">오늘의 당도 체크</p>
                {
                    standard_datetime &&
                    <p className="section-sub-title">{standard_datetime} 기준</p>
                }
            </div>

            <div className="swiper-type2">
                <div className="swiper mySwiperSweetness">
                    <div className="swiper-wrapper">
                        {
                            sweetness.map((sweetnes,index)=>{
                                return(
                                    <div className="swiper-slide" key={index}>
                                        <div className="sweetness-check-item">
                                            <div className="img-wrap ratio-box">
                                                <img src={sweetnes.img.url} alt={sweetnes.img.name} />
                                            </div>
                                            <div className="txt-wrap">
                                                <p className="txt-top">{sweetnes.sweetness}</p>
                                                <p className="txt-ct">{sweetnes.fruit_name}</p>
                                                <p className="txt-bt">기준 {sweetnes.standard_sweetness}brix</p>
                                            </div>
                                        </div>
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