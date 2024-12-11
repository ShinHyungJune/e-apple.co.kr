import React from "react";

export default function ReviewPhotoItemType1({ review, onClick }) {
    // console.log(review);
    return (
        <div className="review-photo-item-type1" onClick={onClick}>
            <div className="img-wrap ratio-box">
                <img
                    src={review.imgs[0].url}
                    alt={review.imgs[0].name}
                />
            </div>
        </div>
    );
}
