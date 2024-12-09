import React, { useState, useEffect } from "react";


const PopupOrder = ({ product, setIsPopupOrder, onSuccess }) => {



    

    return (
        <>
            <div className="popup-wrap">
                <div className="popup-wrap-bg" onClick={() => { setIsPopupOrder(false) }}></div>
                <div className="popup-box-type1">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={() => { setIsPopupOrder(false) }}></button>
                    </div>

                    <div className="popup-content-wrap">
                        <div className="mb-20">
                            <div className="select-box-type1">
                                <select name="" id="">
                                    <option value="">선택해주세요.</option>
                                    <option value="">중량선택</option>
                                </select>
                                <i className="xi-angle-down"></i>
                            </div>
                        </div>

                        <div className="saved-items-list-type1">
                            <ul>
                                <li>
                                    <div className="saved-item-type1">
                                        <div className="saved-item-name">
                                            <p className="option">2kg(5-6 대과)</p>
                                            <p className="price">29,900원</p>
                                        </div>
                                        <div className="quantity-selector">
                                            <button>
                                                <i className="xi-minus"></i>
                                            </button>
                                            <input type="number" value="1" readOnly />
                                            <button>
                                                <i className="xi-plus"></i>
                                            </button>
                                        </div>
                                        <button className="delete-btn">
                                            <i className="xi-close"></i>
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="saved-item-type1">
                                        <div className="saved-item-name">
                                            <p className="option">2kg(5-6 대과)</p>
                                            <p className="price">29,900원</p>
                                        </div>
                                        <div className="quantity-selector">
                                            <button>
                                                <i className="xi-minus"></i>
                                            </button>
                                            <input type="number" value="1" readOnly />
                                            <button>
                                                <i className="xi-plus"></i>
                                            </button>
                                        </div>
                                        <button className="delete-btn">
                                            <i className="xi-close"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="price-information-list mb-20">
                            <ul>
                                <li>
                                    <div className="price-information">
                                        <p className="label">총 상품 금액</p>
                                        <p className="price">45,000원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">상품금액</p>
                                        <p className="price minus">-4,830원</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="price-information final">
                                <p className="label">총 상품금액</p>
                                <p className="price">30,170원</p>
                            </div>
                        </div>

                        <div className="popup-bt-btn-wrap">
                            <button className="popup-bt-btn wht" onClick={()=>{
                                setIsPopupOrder(false)
                                onSuccess()
                            }}>장바구니</button>
                            <button className="popup-bt-btn org">바로구매</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupOrder;
