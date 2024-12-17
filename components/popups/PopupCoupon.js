import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import couponsApi from "@/lib/api/couponsApi";
import NoListData from "@/components/NoListData";
import CouponItem from "@/components/library/CouponItem";
import Pagination from "@/components/Pagination";

const PopupCoupon = ({setIsPopupCoupon}) => {
    const dispatch = useDispatch();
    
    const [form, setForm] = useState({
        page: 1,
    });
    const [coupons, setCoupons] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        couponsIndex()
    }, [form])
    function couponsIndex() {
        couponsApi.index(form, (response) => {
            setCoupons(response.data);
        })
    }


    function couponsDownload(id) {
        return new Promise((resolve, reject) => {
            couponsApi.download(id, {}, (response) => {
                resolve(); // 성공 시 resolve
            }, (error) => {
                reject(error); // 실패 시 reject
            });
        });
    }
    
    function couponsAllDownload() {
        // coupons.data 배열에서 is_downloaded가 false인 쿠폰만 필터링
        const notDownloadedCoupons = coupons.data.filter(coupon => !coupon.is_downloaded);
        
        // 다운로드 작업을 Promise 배열로 생성
        const downloadPromises = notDownloadedCoupons.map(coupon => couponsDownload(coupon.id));
        
        // 모든 다운로드가 완료되면 실행
        Promise.all(downloadPromises)
            .then(() => {
                dispatch(actions.setMessage("모든 쿠폰을 다운로드 완료했습니다"));
                couponsIndex()
            })
            .catch((error) => {
                console.error("다운로드 중 오류 발생:", error);
                couponsIndex()
            });
    }
    
    

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
                        {
                            coupons.data.length > 0 ? (
                                <ul>
                                    {
                                        coupons.data.map((coupon)=>{
                                            return(
                                                <li key={coupon.id}>
                                                    <CouponItem coupon={coupon} onSuccess={()=>{couponsIndex()}}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (<NoListData message={"쿠폰이 없습니다."}/>)
                        }
                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={coupons.meta}
                    />
                    <div className="popup-bt-btn-wrap">
                        <button className="popup-bt-btn org" onClick={()=>{couponsAllDownload()}}>전체 다운로드</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupCoupon;
