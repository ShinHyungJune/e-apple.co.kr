import React, { useState, useEffect, useMemo } from "react";
import cartProductOptionApi from "@/lib/api/cartProductOptionsApi";

const PopupCartAddOption = ({ cart, setCart, onSuccess }) => {

    // 카트에 담긴 삼품
    const [product, setProduct] = useState(cart.product);

    const [selectedOptionId, setSelectedOptionId] = useState(); // 선택된 옵션 저장

    // 옵션 추가
    function cartProductOptionStore() {
        cartProductOptionApi.store(cart.id, {
            quantity: "1",
            product_option_id: selectedOptionId
        }, (response) => {
            console.log(response);
            setCart(false)
            onSuccess()
        });
    }



    return (
        <>
            <div className="popup-wrap">
                <div className="popup-wrap-bg" onClick={() => { setCart(false) }}></div>
                <div className="popup-box-type1">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={() => { setCart(false) }}></button>
                    </div>

                    <div className="popup-content-wrap">
                        <div className="popup-title">
                            <p>옵션추가</p>
                        </div>
                        <div className="mb-20">
                            <div className="select-box-type1">
                                <select
                                    name="productOptions"
                                    id="productOptions"
                                    onChange={(e) => setSelectedOptionId(e.target.value)} // 선택한 값 저장
                                >
                                    <option value="">추가할 옵션을 선택해주세요.</option>
                                    {cart.product.options.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} - {option.price}원
                                        </option>
                                    ))}
                                </select>
                                <i className="xi-angle-down"></i>
                            </div>
                        </div>

                        <div className="popup-bt-btn-wrap">
                            <button className="popup-bt-btn org" onClick={() => { cartProductOptionStore() }}>옵션추가</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupCartAddOption;
