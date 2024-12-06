import React from "react";

export default function ReviewPhotoItemType1({ review, onClick }) {
  return (
    <div className="review-photo-item-type1" onClick={onClick}>
      <div className="img-wrap ratio-box">
        <img
          src={review.images[0].original_url}
          alt={review.images[0].file_name}
        />
      </div>
    </div>
  );
}
