import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import PopupOrder from '@/components/popups/PopupOrder';
import ToastAlert from "@/components/ToastAlert";

export default function ProductItemType1({ product }) {
    const router = useRouter();

    // 장바구니 추가 팝업 열고닫기
    const [isPopupOrder, setIsPopupOrder] = useState(false)

    const [showToast, setShowToast] = useState(false);

    if (product)
        return (
            <>
                {isPopupOrder ? <PopupOrder product={product} setIsPopupOrder={setIsPopupOrder} onlyCart={true} onSuccess={() => {setShowToast(true);}} /> : null}
                <article className="item-type1" role="article">
                    <div className="item-img-wrap">
                        <Link href={`/products/${product.id}`} className="img" aria-label={`${product.name} 상품 상세 페이지로 이동`}>
                            <img src={product.img?.url} alt={`${product.name} 상품 이미지`} />
                        </Link>
                        {product.is_new ?
                            <div className="new" aria-label="신상품">
                                NEW
                            </div>
                            : null}
                        <button 
                            className="cart-btn active" 
                            onClick={()=>{setIsPopupOrder(true)}}
                            aria-label={`${product.name} 장바구니에 담기`}
                            type="button"
                        ></button>
                    </div>
                    <div className="item-content-wrap">
                        <Link href={`/products/${product.id}`} className="item-name" aria-label={`${product.name} 상품 상세 보기`}>
                            {product.name}
                        </Link>
                        <div className="price-wrap">
                            <p className="discounted-price" aria-label={`할인가 ${product.price.toLocaleString()}원`}>
                                {product.price.toLocaleString()}원
                            </p>
                            <p className="original-price" aria-label={`원가 ${product.original_price.toLocaleString()}원`}>
                                {product.original_price.toLocaleString()}원
                            </p>
                        </div>
                        <div className="sub-content">
                            <p aria-label={`평점 ${product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}점`}>
                                <i className="xi-star-o" aria-hidden="true"></i>
                                {product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}
                            </p>
                            <p aria-label={`조회수 ${product.view_count}회`}>
                                <i className="xi-eye-o" aria-hidden="true"></i>
                                {product.view_count}
                            </p>
                        </div>
                    </div>
                </article>
                {/* 장바구니 추가 완료 팝업 */}
                {showToast && (
                    <ToastAlert
                        message="장바구니 담기 완료"
                        navigateText="장바구니로 이동" // 문구 동적으로 설정
                        onNavigate={()=>{router.push("/mypage/carts")}} // 버튼 클릭 시 호출
                        duration={3000}
                        onClose={() => setShowToast(false)} // 알림 닫힌 후 상태 초기화
                    />
                )}
            </>
        );
}
