import Link from 'next/link';
import { useEffect, useState } from "react";
import StarScore from './StarScore';
import PopupReview from '../popups/PopupReview';

export default function ReviewItemType1({ review }) {
    // 리뷰팝업
    const [targetReview, setTargetReview] = useState(null);
    if (review)
        return (
            <>
                <div className="review-item-type1">
                    <div className="item-content-wrap">
                        <p className="date">{review.created_date}</p>
                        <p className="content">
                            {review.review}
                        </p>
                        <StarScore score={review.rating} />
                    </div>
                    <div className="img-wrap ratio-box" onClick={() => setTargetReview(review)}>
                        <img src={review.img.url} alt={review.img.name} />
                    </div>
                </div>
                {targetReview && <PopupReview review={targetReview} setReview={setTargetReview} />}
            </>

        );
}
