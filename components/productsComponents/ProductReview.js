import React, { useState, useEffect } from "react";
import productsApi from "@/lib/api/productsApi";
import Pagination from "@/components/Pagination";
import Swiper from "swiper";
import ReviewPhotoItemType1 from "@/components/library/ReviewPhotoItemType1";
import StarScore from "../library/StarScore";
import NoListData from "../NoListData";
import PopupReview from "../popups/PopupReview";

const ProductReview = ({ product }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [form, setForm] = useState({
        page: 1,
        type: "",
        take:"4",
    });

    const [reviews, setReviews] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    const [photoReviewsForm, setPhotoReviewsForm] = useState({
        page: 1,
        type: "photo",
    });

    const [photoReviews, setPhotoReviews] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        if (isFirstRender)
            return setIsFirstRender(false);

        setForm({ ...form, page: "1" });
    }, [JSON.stringify({ ...form, page: undefined, })]);

    useEffect(() => {
        productsReviewIndex()
    }, [form])

    function productsReviewIndex() {
        productsApi.ReviewIndex(product.id, form, (response) => {
            setReviews(response.data);
        })
    }


    useEffect(() => {
        productsPhotoReviewsIndex()
    }, [photoReviewsForm])

    function productsPhotoReviewsIndex() {
        productsApi.ReviewIndex(product.id, photoReviewsForm, (response) => {
            setPhotoReviews(response.data);
        })
    }




    useEffect(() => {
        let swiper;

        // Swiper 초기화 함수
        const initializeSwiper2 = () => {
            const swiperElement = document.querySelector(".mySwiper2"); // .mySwiper2 요소 확인
            if (swiperElement) {
                if (swiper) {
                    swiper.destroy(true, true); // 기존 Swiper 인스턴스가 있으면 삭제
                }
                swiper = new Swiper(swiperElement, {
                    slidesPerView: 3,
                    spaceBetween: 5,
                });
            }
        };

        initializeSwiper2();

        // 컴포넌트 언마운트 시 Swiper 인스턴스 삭제
        return () => {
            if (swiper) swiper.destroy(true, true);
        };
    }, [reviews]);


    // 리뷰팝업
    const [targetReview, setTargetReview] = useState(null);

    return (
        <>
            <section id="review" className="pt-30 mb-50">
                <div className="review-photo-list-type1 mb-20">
                    <div className="star-score-wrap">
                        <StarScore score={product.average_rating} />
                        <p lang="score-txt">
                            {product.average_rating ? parseFloat(product.average_rating).toFixed(1) : 0} <span>/ 5</span>
                        </p>
                    </div>
                    {
                        photoReviews.data.length > 0 ? (
                            <div className="swiper mySwiper2">
                                <div className="swiper-wrapper">
                                    {photoReviews.data.map((photoReview, index) => (
                                        <div className="swiper-slide" key={index}>
                                            <ReviewPhotoItemType1
                                                review={photoReview}
                                                onClick={() => setTargetReview(photoReview)} // 클릭 시 실행
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    }
                </div>

                <div className="tab-menu-type3 mb-10">
                    <div className="tab-menu-bar">
                        <button
                            className={`tab-item ${form.type === "" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, type: "" })}
                        >
                            전체
                        </button>
                        <button
                            className={`tab-item ${form.type === "photo" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, type: "photo" })}
                        >
                            포토
                        </button>
                        <button
                            className={`tab-item ${form.type === "text" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, type: "text" })}
                        >
                            일반
                        </button>
                    </div>
                </div>

                <div className="review-list-type2">
                    {
                        reviews.data.length > 0 ? (
                            <ul>
                                {
                                    reviews.data.map((review, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="review-item-type2">
                                                    <div className="review-item-top">
                                                        <div className="star-score-wrap">
                                                            <StarScore score={review.rating} />
                                                            <p className="user-name">{review.user.email}</p>
                                                        </div>
                                                        <p className="date">{review.created_date}</p>
                                                    </div>
                                                    <div className="review-item-bt">
                                                        <p className="review-content">
                                                            {review.review}
                                                        </p>
                                                        {
                                                            review.images.length > 0 ? (
                                                                <div className="img-wrap">
                                                                    <ReviewPhotoItemType1 
                                                                        review={review}
                                                                        onClick={() => setTargetReview(review)} 
                                                                    />
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ) : (
                            <NoListData message="리뷰가 없습니다." />
                        )
                    }
                </div>

                <Pagination
                    form={form}
                    setForm={setForm}
                    meta={reviews.meta}
                />
            </section>
            {
                targetReview ? <PopupReview review={targetReview} setReview={setTargetReview} /> : null
            }

        </>

    );
};

export default ProductReview;
