import Link from 'next/link';
import { useEffect, useState } from "react";
import StarScore from '@/components/library/StarScore';
import product_reviewApi from '@/lib/api/product_reviewApi';

export default function ReviewMine({review, onSuccess}) {

    const destroy = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            product_reviewApi.destroy(review.id, {}, (response) => {
                onSuccess()
            });
        }
    };


    if(review)
    return (
        <div className="order-product-item-type1 px-20">
            <div className="order-product-type1">
                <div className="item-img-wrap ratio-box">
                    <img src={review.product.img.url} alt={review.product.img.name} />
                </div>
                <div className="item-content-wrap">
                    <p className="item-title">{review.product.name}</p>
                    <p className="item-option">{review.orderProduct.productOption.name}</p>
                    <div className="item-count-amount-wrap">
                        <p className="item-count">수량 {review.orderProduct.quantity}개</p>
                        <p className="item-amount">{review.orderProduct.price.toLocaleString()}원</p>
                    </div>
                </div>
            </div>

            <div className="order-product-review-wrap mb-20">
                <StarScore score={review.rating} />
                <div className="order-product-review mb-10 mt-10">
                    <p className="order-product-review">
                        {review.review}
                    </p>
                </div>
                <div className="date-wrap mb-10">{review.created_date}</div>
                <div className="review-photo-list">
                    <ul>
                        {
                            review.imgs.map((img)=>{
                                return(
                                    <li className="ratio-box" key={img.id}>
                                        <img src={img.url} alt={img.name} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="order-product-btn-wrap">
                <Link href={`/mypage/review/create/?id=${review.id}`} className="order-product-btn">
                    수정
                </Link>
                <button onClick={()=>{destroy()}} className="order-product-btn">
                    삭제
                </button>
            </div>
        </div>
    );
}
