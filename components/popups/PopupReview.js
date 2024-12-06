import React, { useState, useEffect } from "react";


const PopupReview = ({review}) => {
    return (
        <div className="popup-wrap">
            <div className="popup-wrap-bg"></div>
            <div className="popup-box-type2">
                <div className="popup-close-btn-wrap">
                    <p className="popup-title">포토 후기</p>
                    <button className="popup-close-btn"><i className="xi-close"></i></button>
                </div>

                <div className="popup-content-wrap pt-20">

                </div>
            </div>
        </div>
    );
};

export default PopupReview;
