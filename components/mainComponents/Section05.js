import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import ProductItemType2 from "../library/ProductItemType2";
import ProductItemType3 from "../library/ProductItemType3";

export default function Section05({ monthlySuggestionProducts = [] }) {
    const [activeIndex, setActiveIndex] = useState(0); // 활성화된 탭의 인덱스 상태 관리
    const swiperRef = useRef(null); // Swiper 인스턴스를 관리하기 위한 Ref

    useEffect(() => {
        // Swiper 초기화
        swiperRef.current = new Swiper(".mySwiperMonthlySuggestionProducts", {
            slidesPerView: 1,
            spaceBetween: 10,
            speed:1000,
            on: {
                slideChange: () => {
                    if (swiperRef.current) {
                        setActiveIndex(swiperRef.current.activeIndex); // 슬라이드 변경 시 activeIndex 업데이트
                    }
                },
            },
        });

        return () => {
            if (swiperRef.current) swiperRef.current.destroy(true, true); // 언마운트 시 삭제
        };
    }, [monthlySuggestionProducts]);

    // 특정 슬라이드로 이동하는 함수
    const handleTabClick = (index) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index); // Swiper의 slideTo 메서드를 사용해 이동
            setActiveIndex(index); // 클릭된 탭을 활성화
        }
    };

    if (monthlySuggestionProducts.length > 0)
        return (
            <section className="pt-40 mb-60">
                <div className="section-title-wrap-type1">
                    <p className="section-title">이달의 추천 상품</p>
                </div>

                <div className="tab-menu-type1">
                    <ul className="px-20">
                        {monthlySuggestionProducts.map((monthlySuggestionProduct, index) => (
                            <li
                                key={monthlySuggestionProduct.id}
                                className={index === activeIndex ? "active" : ""}
                                onClick={() => handleTabClick(index)} // 클릭 시 슬라이드 이동
                            >
                                {monthlySuggestionProduct.category_title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="swiper-type3 mb-40">
                    <div className="swiper mySwiperMonthlySuggestionProducts">
                        <div className="swiper-wrapper">
                            {monthlySuggestionProducts.map((monthlySuggestionProduct) => (
                                <div className="swiper-slide" key={monthlySuggestionProduct.id}>
                                    <ProductItemType2 categorie={monthlySuggestionProduct} />
                                    <div className="item-list-type3 mt-40">
                                        <ul>
                                            {monthlySuggestionProduct.products.map((product) => (
                                                <li key={product.id}>
                                                    <ProductItemType3 product={product} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
}
