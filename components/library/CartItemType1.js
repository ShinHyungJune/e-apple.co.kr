import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link';

export default function CartItemType1({ cart }) {

    // 쿠폰사용전 상품들 총 가격
    const totalPrice = useMemo(() => {
        if (!cart || !cart.cart_product_options) return 0;
    
        return cart.cart_product_options.reduce((total, option) => {
            return total + ((cart.product.price + option.price) * option.quantity);
        }, 0);
    }, [cart]);

    
    if (cart)
        return (
            <div className="cart-item-type1">
                <div className="cart-item-main-box mb-20">
                    <div className="checkbox-type1 px16">
                        <input type="checkbox" id="checkbox-02" />
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
                            <button className="add-option-btn">옵션추가</button>
                        </div>
                    </div>
                    <button className="delete-btn">
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
                                                <p className="price">{((cart.product.price + cart_product_option.price) * cart_product_option.quantity).toLocaleString()}원</p>
                                            </div>
                                            <div className="quantity-selector">
                                                <button>
                                                    <i className="xi-minus"></i>
                                                </button>
                                                <input type="number" value={cart_product_option.quantity} readOnly />
                                                <button>
                                                    <i className="xi-plus"></i>
                                                </button>
                                            </div>
                                            <button className="delete-btn">
                                                <i className="xi-close"></i>
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <p className="cart-item-price">상품가격 {totalPrice.toLocaleString()} + 배송비 3,000 = {(totalPrice + 3000).toLocaleString()}</p>
            </div>
        );
}
