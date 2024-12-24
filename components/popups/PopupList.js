import React, { useState, useEffect } from "react";
import productsApi from "@/lib/api/productsApi";
import NoListData from "../NoListData";
import ProductItemType1 from "../library/ProductItemType1";
import Pagination from "../Pagination";

const PopupList = ({ isPopup, setIsPopup }) => {


    // useEffect(() => {
    //     ProductsIndex()
    // }, [form])

    // function ProductsIndex() {
    //     productsApi.index("best", form, (response) => {
    //         setProducts(response.data);
    //     })
    // }
    

    return (
        <>
            <div className="popup-wrap add-bottomNav">
                <div className="popup-wrap-bg" onClick={()=>{setIsPopup(false)}}></div>
                <div className="popup-box-type1 no-x-padding">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={()=>{setIsPopup(false)}}></button>
                    </div>
                    <div className="popup-content-wrap">
                        <div className="category-list-type1 pb-20">

                            <div className="category-main">
                                <div className="category-main-btn">
                                    <button>국산 과일 
                                        {/* <i className="xi-angle-down-min"></i> */}
                                    </button>
                                </div>
                                <ul className="category-sub">
                                    <li>전체보기</li>
                                    <li>딸기</li>
                                    <li>사과</li>
                                </ul>
                            </div>

                            <div className="category-main">
                                <div className="category-main-btn">
                                    <button>수입 과일  
                                        {/* <i className="xi-angle-down-min"></i> */}
                                    </button>
                                </div>
                                <ul className="category-sub">
                                    <li>전체보기</li>
                                    <li>망고/열대과일</li>
                                    <li>블루베리</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
       
    );
};

export default PopupList;
