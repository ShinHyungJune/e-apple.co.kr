import Link from 'next/link';
import { useEffect, useState } from "react";
import StarScore from '@/components/library/StarScore';
import product_reviewApi from '@/lib/api/product_reviewApi';

export default function ReviewAvailable({ review, onSuccess }) {

    // const destroy = () => {
    //     const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    //     if (confirmDelete) {
    //         product_reviewApi.destroy(review.id, {}, (response) => {

    //         });
    //     }
    // };

    const queryParams = {
        order_id: review.order_id,
        order_product_id: review.id,
        product_id: review.product.id,
        product_option_id: review.productOption.id,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    

    if (review)
    return (
        <div className="order-product-item-type1 px-20">
            <div className="order-status-wrap">
                <div className="order-status-box">
                    <p className="order-status">D-{review.d_day}</p>
                </div>
                <p className="shipping-fee">
                    적립 가능한 최대 마일리지 1,500P
                </p>
            </div>

            <div className="order-product-type1">
                <div className="item-img-wrap ratio-box">
                    <img src={review.product.img.url} alt={review.product.img.name} />
                </div>
                <div className="item-content-wrap">
                    <p className="item-title">{review.product.name}</p>
                    <p className="item-option">{review.productOption.name}</p>
                    <div className="item-count-amount-wrap">
                        <p className="item-count">수량 {review.quantity}개</p>
                        <p className="item-amount">{review.price.toLocaleString()}원</p>
                    </div>
                </div>
            </div>

            <div className="order-product-btn-wrap">
                <Link href={`/mypage/review/create?${queryString}`} className="order-product-btn big blk">
                    리뷰작성
                </Link>
            </div>
        </div>
    );
}
