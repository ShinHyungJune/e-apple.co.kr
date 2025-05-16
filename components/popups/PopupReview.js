import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import StarScore from "../library/StarScore";

const PopupReview = ({ review, setReview }) => {

    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            const swiperElement = document.querySelector(".review-swiper-photo"); // .mySwiper2 요소 확인
            if (swiperElement) {
                if (swiper) {
                    swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
                }
                swiper = new Swiper(swiperElement, {
                    slidesPerView: 1,
                    spaceBetween: 5,
                });
            }
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, [review]);


    return (
        <div className="popup-wrap">
            <div className="popup-wrap-bg"></div>
            <div className="popup-box-type2">
                <div className="popup-close-btn-wrap">
                    <p className="popup-title">포토 후기</p>
                    <button className="popup-close-btn" onClick={() => { setReview(false) }}><i className="xi-close"></i></button>
                </div>

                <div className="popup-content-wrap pt-20">
                    {
                        review.imgs.length > 0 ? (
                            <div className="swiper review-swiper-photo">
                                <div className="swiper-wrapper">
                                    {review.imgs.map((photoReview) => (
                                        <div className="swiper-slide" key={photoReview.id}>
                                            <div className="review-swiper-photo-item-type1">
                                                <img src={photoReview.url} alt={photoReview.name} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    }
                    <div className="review-item-type2 ">
                        <div className="review-item-top px-20">
                            <div className="star-score-wrap">
                                <StarScore score={review.rating} />
                                <p className="user-name">{review.user?.email}</p>
                            </div>
                            <p className="date">{review.created_date}</p>
                        </div>
                        <div className="review-item-bt px-20">
                            <p className="review-content">
                                {review.review}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PopupReview;
