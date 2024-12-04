import Link from "next/link";
import { useEffect, useState } from "react";
import Swiper from "swiper";
export default function Section01() {

    const [mainBanners, setMainBanners] = useState([]);

    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            if (swiper) {
                swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
            }
            swiper = new Swiper(".mySwiper1", {
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
    }, [mainBanners]);


    return (
        <section className="mb-70">
            <div className="swiper-type1">
                <div className="swiper mySwiper1">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="content-box">
                                <div className="bg-wrap">
                                    <img src="/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">
                                        해독작용에 탁월한 <br />
                                        6월의 과일 매실
                                    </p>
                                    <p className="txt-bt">
                                        배탈과 식중독 예방에 좋은 <br />
                                        매실로 건강한 여름 되세요!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="content-box">
                                <div className="bg-wrap">
                                    <img src="/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">
                                        해독작용에 탁월한 <br />
                                        6월의 과일 매실
                                    </p>
                                    <p className="txt-bt">
                                        배탈과 식중독 예방에 좋은 <br />
                                        매실로 건강한 여름 되세요!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="content-box">
                                <div className="bg-wrap">
                                    <img src="/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="txt-top">
                                        해독작용에 탁월한 <br />
                                        6월의 과일 매실
                                    </p>
                                    <p className="txt-bt">
                                        배탈과 식중독 예방에 좋은 <br />
                                        매실로 건강한 여름 되세요!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}