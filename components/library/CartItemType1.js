import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link';
import cartsApi from "@/lib/api/cartsApi";
import cartProductOptionsApi from "@/lib/api/cartProductOptionsApi";
import PopupCartAddOption from "../popups/PopupCartAddOption";

export default function CartItemType1({ cart, onSuccess, isSelected, onSelect }) {

    // 옵션 추가 팝업 열고닫기
    const [isPopupCartAddOption, setIsPopupCartAddOption] = useState(null);

    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_product_options) return 0;

        return cart.cart_product_options.reduce((total, option) => {
            return total + (option.price * option.quantity);
        }, 0);
    }, [cart]);

    // 장바구니 삭제
    const destroy = () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            cartsApi.destroy(cart.id, {}, (response) => {
                alert("삭제되었습니다.");
                onSuccess()
            });
        }
    };

    // 옵션삭제
    const DestroyProductOption = (cart_product_option_id) => {
        if (cart.cart_product_options.length > 1) {
            cartProductOptionsApi.destroy(cart.id, cart_product_option_id, {}, (response) => {
                alert("삭제되었습니다.");
                onSuccess()
            });
        } else {
            alert("옵션은 최소 한 개 이상이어야 합니다. 삭제할 수 없습니다.")
        }
    }

    // 옵션 갯수 상승
    const update = (cart_product_option_id, quantity) => {
        cartProductOptionsApi.update(cart.id, cart_product_option_id, {
            quantity: quantity // 숫자를 문자열로 변환
        }, (response) => {
            onSuccess();
        });
    };
    





    if (cart)
        return (
            <>
                { isPopupCartAddOption && (
                <PopupCartAddOption 
                cart={isPopupCartAddOption} 
                setCart={setIsPopupCartAddOption} 
                onSuccess={()=>{onSuccess()}} />
                ) }
                
                <div className="cart-item-type1">
                    <div className="cart-item-main-box mb-20">
                        <div className="checkbox-type1 px16">
                            <input
                                type="checkbox"
                                id={`checkbox-${cart.id}`}
                                checked={isSelected}
                                onChange={(e) => onSelect(e.target.checked)}
                            />
                        </div>
                        <div className="item-type3 cart">
                            <div className="item-img-wrap">
                                <a href={`/products/${cart.product.id}`} className="img">
                                    <img src={cart.product.img.url} alt={cart.product.img.name} />
                                </a>
                            </div>
                            <div className="item-content-wrap">
                                <a href={`/products/${cart.product.id}`} className="item-name">
                                    {cart.product.name}
                                </a>
                                <button className="add-option-btn" onClick={()=>{setIsPopupCartAddOption(cart)}}>옵션추가</button>
                            </div>
                        </div>
                        <button className="delete-btn" onClick={() => { destroy() }}>
                            <i className="xi-close"></i>
                        </button>
                    </div>

                    <div className="saved-items-list-type1 mb-10">
                        <ul>
                            {
                                cart.cart_product_options.map((cart_product_option) => {
                                    return (
                                        <li key={cart_product_option.id}>
                                            <div className="saved-item-type1">
                                                <div className="saved-item-name">
                                                    <p className="option">{cart_product_option.name}</p>
                                                    <p className="price">{((cart_product_option.price) * cart_product_option.quantity).toLocaleString()}원</p>
                                                </div>
                                                <div className="quantity-selector">
                                                    <button onClick={() => { update(cart_product_option.id, cart_product_option.quantity - 1) }}>
                                                        <i className="xi-minus"></i>
                                                    </button>
                                                    <input type="number" value={cart_product_option.quantity} readOnly />
                                                    <button onClick={() => { update(cart_product_option.id, cart_product_option.quantity + 1) }}>
                                                        <i className="xi-plus"></i>
                                                    </button>
                                                </div>
                                                <button className="delete-btn" onClick={() => { DestroyProductOption(cart_product_option.id) }}>
                                                    <i className="xi-close"></i>
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p className="cart-item-price">상품가격: {totalPrice.toLocaleString()}원</p>
                </div>
            </>
        );
}
