import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import PopupCoupon from "../popups/PopupCoupon";
import EditorContent from "@/components/EditorContent";

const ProductDescription = ({ product }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const [isPopupCoupon, setIsPopupCoupon] = useState(false)

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

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
    }, [product]);


    

    return (
        <>
            <section id="description">
                <div className="product-description-box">
                    {/* 상품 이미지 */}
                    <div className="product-description-box-img-wrap">
                        <div className="swiper mySwiper1">
                            <div className="swiper-wrapper">
                                {
                                    product.imgs.map((product_image) => {
                                        return (
                                            <div className="swiper-slide" key={product_image.id}>
                                                <img src={product_image.url} alt={product_image.name} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* 상품 상태 및 정보 */}
                    <div className="product-description-content-wrap">
                        <div className="state-wrap">
                            <div className="state-box">
                                {product.is_new ? <div className="new">NEW</div> : null}
                                {product.is_best ? <div className="best">BEST</div> : null}

                            </div>
                            <div className="sub-state-box">
                                <p>
                                    <i className="xi-star-o"></i>
                                    {product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}
                                </p>
                                <p>
                                    <i className="xi-eye-o"></i>{product.view_count}
                                </p>
                            </div>
                        </div>

                        {/* 제목 */}
                        <div className="title-wrap">
                            <p>{product.name}</p>
                        </div>

                        {/* 가격 및 쿠폰 */}
                        <div className="price-coupon-wrap">
                            <div className="price-wrap">
                                <p className="discounted-price">{product.price.toLocaleString()}원</p>
                                <p className="original-price">{product.original_price.toLocaleString()}</p>
                            </div>
                            <div className="coupon-wrap">
                                <button className="coupon-popup-open-btn" onClick={() => { setIsPopupCoupon(true) }}>
                                    쿠폰받기 <i className="xi-download"></i>
                                </button>
                                <button
                                    className="copy-link-btn"
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(window.location.href) // 현재 페이지 URL 복사
                                            .then(() => {
                                                alert("주소 링크가 복사되었습니다!"); // 성공 메시지
                                            })
                                            .catch((err) => {
                                                console.error("링크 복사 실패: ", err); // 에러 처리
                                            });
                                    }}
                                >
                                    <i className="xi-link"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 상세 정보 */}
                    <div className="product-description-sub-content-wrap">
                        <ul>
                            {product.delivery_fee !== null && product.delivery_fee !== undefined && (
                                <li>
                                    <p className="label">배송비</p>
                                    <p className="content">{product.delivery_fee != 0 ? product.delivery_fee.toLocaleString() + "원" : "무료배송"}</p>
                                </li>
                            )}
                            {product.shipping_origin && (
                                <li>
                                    <p className="label">출고지</p>
                                    <p className="content">{product.shipping_origin}</p>
                                </li>
                            )}
                            {product.fruit_size && (
                                <li>
                                    <p className="label">과일 크기</p>
                                    <p className="content">{product.fruit_size}</p>
                                </li>
                            )}
                            {product.sugar_content && (
                                <li>
                                    <p className="label">당도</p>
                                    <p className="content">{product.sugar_content} Brit</p>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* 더보기 버튼 */}
                    <div
                        className={`product-description ${isDescriptionOpen ? "active" : ""}`}
                    >
                        <div className="">
                            <EditorContent description={product.description} />
                        </div>
                        <button className="more-btn" onClick={toggleDescription}>
                            상품 성명 더보기 <i className="xi-angle-down-thin"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* 쿠폰 다운 팝업 */}
            {isPopupCoupon ? <PopupCoupon setIsPopupCoupon={setIsPopupCoupon} /> : null}

        </>

    );
};

export default ProductDescription;
