import React, { useState, useEffect } from "react";


const PopupCoupon = ({setIsPopupCoupon}) => {
    return (
        <div className="popup-wrap">
            <div className="popup-wrap-bg" onClick={()=>{setIsPopupCoupon(false)}}></div>
            <div className="popup-box-type1">
                <div className="popup-close-btn-wrap">
                    <button className="popup-close-btn" onClick={()=>{setIsPopupCoupon(false)}}></button>
                </div>

                <div className="popup-content-wrap">
                    <div className="popup-title">
                        <p>사용 가능 쿠폰</p>
                    </div>

                    <div className="coupon-list">
                        <ul>
                            <li>
                                <div className="coupon-item">
                                    <div className="coupon-item-top">
                                        <p className="discount">12%</p>
                                        <button className="coupon-bownload-btn">
                                            <i className="xi-download"></i>
                                        </button>
                                    </div>
                                    <div className="coupon-item-bt">
                                        <p className="coupon-item-name">[이달의 과일] 12% 쿠폰</p>
                                        <div className="coupon-item-maximum-period">
                                            <p className="maximum">최대 10,000원 할인</p>
                                            <p className="period">1일 4시간 2분 남음</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="coupon-item">
                                    <div className="coupon-item-top">
                                        <p className="discount">12%</p>
                                        <p className="complete-txt">
                                            다운완료 <i className="xi-check"></i>
                                        </p>
                                    </div>
                                    <div className="coupon-item-bt">
                                        <p className="coupon-item-name">[이달의 과일] 12% 쿠폰</p>
                                        <div className="coupon-item-maximum-period">
                                            <p className="maximum">최대 10,000원 할인</p>
                                            <p className="period">1일 4시간 2분 남음</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="popup-bt-btn-wrap">
                        <button className="popup-bt-btn org">전체 다운로드</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupCoupon;
