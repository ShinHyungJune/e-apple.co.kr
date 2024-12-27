import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import couponsApi from "@/lib/api/couponsApi";


const CouponItem = ({ coupon, onSuccess }) => {
    const dispatch = useDispatch();
    // 유저 정보 관리
    const user = useSelector(state => state.app.user);

    function couponsDownload(id) {
        couponsApi.download(id, {}, (response) => {
            let message = response.data.message
            console.log(message)
            dispatch(actions.setMessage(message));
            onSuccess()
        });
    }

    if (coupon)
        return (
            <div className="coupon-item">
                <div className="coupon-item-top">
                    <p className="discount">
                        {
                            coupon.type == "amount" ?
                                coupon.discount_rate + "%"
                                :
                                coupon.discount_amount.toLocaleString() + "원"
                        }
                    </p>
                    {
                        coupon.is_downloaded == false ?
                        <button className="coupon-bownload-btn" onClick={() => { couponsDownload(coupon.id) }}>
                            <i className="xi-download"></i>
                        </button>
                        :
                        <p className="complete-txt">
                            다운완료 <i className="xi-check"></i>
                        </p>
                    }
                </div>
                <div className="coupon-item-bt">
                    <p className="coupon-item-name">
                        {coupon.name}
                    </p>
                    <div className="coupon-item-maximum-period">
                        <p className="maximum">
                            {
                                coupon.type == "rate" ?
                                    <>최대 {coupon.usage_limit_amount.toLocaleString()}원 할인</>
                                    :
                                    <>최소 결제 {coupon.minimum_purchase_amount.toLocaleString()}원</>
                            }
                        </p>
                        {
                            coupon.human_issued_until ? 
                            <p className="period">{coupon.human_issued_until} 남음</p>
                            :
                            <p className="period">{coupon.expiration_left_days}일 남음</p>
                        }
                    </div>
                </div>
            </div>
        );
};

export default CouponItem;