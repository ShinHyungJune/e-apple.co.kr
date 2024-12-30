"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import cartsApi from "@/lib/api/cartsApi";
import ordersApi from "@/lib/api/ordersApi";
import CartItemType1 from "@/components/library/CartItemType1";

export default function page() {
    const router = useRouter();
    const user = useSelector(state => state.app.user);

    const [selectedIds, setSelectedIds] = useState([]);

    const [form, setForm] = useState({
        page: 1,
    });
    const [carts, setCarts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        cartsIndex()
    }, [form])
    function cartsIndex() {
        cartsApi.index(form, (response) => {
            setCarts(response.data);
            const ids = response.data.data.map(cart => cart.id);
            setSelectedIds(ids);
        })
    }

    // 선택 삭제
    const destroy = () => {
        cartsApi.idsDestroy({
            ids: selectedIds
        }, (response) => {
            cartsIndex()
        });
    }

    // 품절 삭제
    const soldOutDestroy = () => {
        cartsApi.soldOutDestroy({}, (response) => {
            cartsIndex()
        });
    }

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            // 전체 선택
            const allIds = carts.data.map(cart => cart.id);
            setSelectedIds(allIds);
        } else {
            // 전체 해제
            setSelectedIds([]);
        }
    };

    const handleItemSelect = (id, isChecked) => {
        if (isChecked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        }
    };


    // 총 상품 금액, 총 할인 금액, 최종 금액 계산
    const { totalOriginalPrice, totalDiscountPrice, finalPrice } = useMemo(() => {
        let totalOriginalPrice = 0; // 총 상품 금액 (original_price 기준)
        let totalDiscountPrice = 0; // 총 할인된 금액
        let finalPrice = 0; // 최종 금액
    
        // 선택된 상품만 필터링
        const selectedCarts = carts.data.filter(cart => selectedIds.includes(cart.id));
    
        selectedCarts.forEach(cart => {
            cart.cart_product_options.forEach(option => {
                // 상품 금액 계산 (original_price 기준, 없으면 0으로 처리)
                const originalPrice = option.original_price || 0;
                totalOriginalPrice += originalPrice * option.quantity;
    
                // 할인된 금액 계산 (original_price - price) * quantity, 없으면 0으로 처리
                const discountedAmount = (originalPrice - option.price) * option.quantity;
                totalDiscountPrice += discountedAmount;
            });
        });
    
        // 최종 금액 = 상품 금액 - 할인된 금액
        finalPrice = totalOriginalPrice - totalDiscountPrice;
    
        return { totalOriginalPrice, totalDiscountPrice, finalPrice };
    }, [carts, selectedIds]);


    // 구매하기
    function store() {
        const handleStoreCarts = () => {
            ordersApi.store_carts(
                { cart_ids: selectedIds },
                (response) => router.push(`/orders?order_id=${response.data.data.id}`)
            );
        };
    
        if (user) {
            handleStoreCarts();
        } else if (window.confirm("로그인 하시겠습니까?")) {
            router.push(`/login?redirect=/mypage/carts`);
        } else {
            handleStoreCarts();
        }
    }
    


    return (
        <>
            <Header />

            <div className="body">
                {/* 총 구매 버튼 */}
                <div className="buy-cart-items-btn-wrap">
                    <p className="price">{finalPrice.toLocaleString()}원</p>
                    <button onClick={() => { store() }} className="buy-cart-items-btn">
                        총 {selectedIds.length}개 구매하기
                    </button>
                </div>

                <section>
                    {/* 상단 바 */}
                    <div className="cart-top-bar">
                        <div className="cart-top-bar-le">
                            <div className="checkbox-type1 px16">
                                <input
                                    type="checkbox"
                                    id="checkbox-01"
                                    checked={carts.data.length > 0 && selectedIds.length === carts.data.length}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <label htmlFor="checkbox-01">전체선택</label>
                            </div>
                            <button className="cart-top-btn" onClick={() => { destroy() }}>선택삭제</button>
                            <button className="cart-top-btn" onClick={() => { soldOutDestroy() }}>품절삭제</button>
                        </div>
                    </div>

                    {/* 장바구니 목록 */}
                    <div className="cart-item-list-type1">
                        {carts.data.length > 0 ? (
                            <ul>
                                {carts.data.map((cart) => (
                                    <li key={cart.id}>
                                        <CartItemType1
                                            cart={cart}
                                            onSuccess={() => cartsIndex()}
                                            isSelected={selectedIds.includes(cart.id)}
                                            onSelect={(isChecked) => handleItemSelect(cart.id, isChecked)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoListData message={"장바구니에 담은 상품이 없습니다."} />
                        )}
                    </div>

                    {/* 가격 정보 */}
                    <div className="price-information-list mb-20 px-20">
                        <ul>
                            <li>
                                <div className="price-information">
                                    <p className="label">상품금액</p>
                                    <p className="price">{totalOriginalPrice.toLocaleString()}원</p>
                                </div>
                            </li>
                            <li>
                                <div className="price-information">
                                    <p className="label">할인금액</p>
                                    <p className="price minus">-{totalDiscountPrice.toLocaleString()}원</p>
                                </div>
                            </li>
                            {/* <li>
                                <div className="price-information sub">
                                    <p className="label">가격인하/할인</p>
                                    <p className="price minus">-6,500원</p>
                                </div>
                            </li> */}
                            {/* <li>
                                <div className="price-information">
                                    <p className="label">배송비</p>
                                    <p className="price">{totalDeliveryFee.toLocaleString()}원</p>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
