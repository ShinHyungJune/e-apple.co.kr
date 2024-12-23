import Link from 'next/link';
import { useEffect, useState } from "react";
import StarScore from '@/components/library/StarScore';
import product_reviewApi from '@/lib/api/product_reviewApi';

export default function ReviewAvailable({ review }) {

    const destroy = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            product_reviewApi.destroy(review.id, {}, (response) => {
                
            });
        }
    };


    if (review)
    return (
        <div className="order-product-item-type1 px-20">
            <div className="order-status-wrap">
                <div className="order-status-box">
                    <p className="order-status">D-1</p>
                </div>
                <p className="shipping-fee">
                    적립 가능한 최대 마일리지 1,500P
                </p>
            </div>

            <div className="order-product-type1">
                <div className="item-img-wrap ratio-box">
                    <img src="/asset/images/test-img.png" alt="" />
                </div>
                <div className="item-content-wrap">
                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                    <p className="item-option">4kg(14-16 중대과)</p>
                    <div className="item-count-amount-wrap">
                        <p className="item-count">수량 1개</p>
                        <p className="item-amount">84,800원</p>
                    </div>
                </div>
            </div>

            <div className="order-product-btn-wrap">
                <Link href="" className="order-product-btn big blk">
                    리뷰작성
                </Link>
            </div>
        </div>
    );
}
