import Link from 'next/link';
import { useEffect, useState } from "react";

export default function ReviewItemType1() {
    return (
        <div className="review-item-type1">
            <div className="item-content-wrap">
                <p className="date">2024.00.00 14:00:02</p>
                <p className="content">
                    달기도 하고 크기도 꽤 크고 좋아요 수박 먹고싶었는데 맛있는 수박 먹어서 너무 기분이…
                </p>
                <div className="star-score">
                    <i className="xi-star"></i>
                    <i className="xi-star"></i>
                    <i className="xi-star"></i>
                    <i className="xi-star"></i>
                    <i className="xi-star-o"></i>
                </div>
            </div>
            <div className="img-wrap ratio-box">
                <img src="/asset/images/test-img.png" alt="" />
            </div>
        </div>
    );
}
