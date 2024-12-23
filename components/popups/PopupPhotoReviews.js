import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import StarScore from "../library/StarScore";
import productsApi from "@/lib/api/productsApi";
import ReviewPhotoItemType1 from "../library/ReviewPhotoItemType1";
import PopupReview from "./PopupReview";
import Pagination from "../Pagination";

const PopupPhotoReviews = ({ productId, setProductId }) => {


    const [photoReviewsForm, setPhotoReviewsForm] = useState({
        page: 1,
        type: "photo",
        take: "12",
    });
    const [photoReviews, setPhotoReviews] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    // 리뷰팝업
    const [targetReview, setTargetReview] = useState(null);

    useEffect(() => {
        productsPhotoReviewsIndex()
    }, [photoReviewsForm])

    function productsPhotoReviewsIndex() {
        productsApi.ReviewIndex(productId, photoReviewsForm, (response) => {
            setPhotoReviews(response.data);
        })
    }

    return (
        <div className="popup-wrap">
            <div className="popup-wrap-bg"></div>
            <div className="popup-box-type2">
                <div className="popup-close-btn-wrap">
                    <p className="popup-title">포토 후기({photoReviews.meta.total})</p>
                    <button className="popup-close-btn" onClick={() => { setProductId(false) }}><i className="xi-close"></i></button>
                </div>

                <div className="popup-content-wrap pt-20">
                    <div className="review-photo-list-type1">
                        <ul>
                            {
                                photoReviews.data.map((photoReview)=>{
                                    return(
                                        <li key={photoReview.id}>
                                            <ReviewPhotoItemType1 review={photoReview} onClick={()=>{setTargetReview(photoReview)}}/>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                    <Pagination
                        form={photoReviewsForm}
                        setForm={setPhotoReviewsForm}
                        meta={photoReviews.meta}
                    />
                </div>
            </div>
            {targetReview && <PopupReview review={targetReview} setReview={setTargetReview} />}
        </div>
    );
};

export default PopupPhotoReviews;
