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
                <div className="item-type1">
                    <div className="item-img-wrap">
                        <Link href={`/products/${product.id}`} className="img">
                            <img src={product.img?.url} alt={product.name} />
                        </Link>
                        {product.is_new ?
                            <div className="new">
                                NEW
                            </div>
                            : null}
                        <button className="cart-btn active" onClick={()=>{setIsPopupOrder(true)}}></button>
                    </div>
                    <div className="item-content-wrap">
                        <Link href={`/products/${product.id}`} className="item-name">
                            {product.name}
                        </Link>
                        <div className="price-wrap">
                            <p className="discounted-price">{product.price.toLocaleString()}원</p>
                            <p className="original-price">{product.original_price.toLocaleString()}원</p>
                        </div>
                        <div className="sub-content">
                            <p><i className="xi-star-o"></i>{product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}</p>
                            <p><i className="xi-eye-o"></i>{product.view_count}</p>
                        </div>
                    </div>
                </div>
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
