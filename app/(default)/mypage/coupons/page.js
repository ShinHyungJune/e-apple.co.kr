"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import couponsApi from "@/lib/api/couponsApi";

import CouponItem from "@/components/library/CouponItem";


export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({});
    const [userCoupons, setUserCoupons] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        IndexUserCoupons()
    }, [form])
    function IndexUserCoupons() {
        couponsApi.indexUserCoupons(form, (response) => {
            setUserCoupons(response.data);
            console.log(response.data);
        })
    }



    return (
        <>
            <Header subTitle={'사용가능 쿠폰'} />

            <div className="body">
                <section className="mb-30 pt-30">
                    <div className="coupon-list px-20">
                        <p className="coupon-list-title">newbie 등급 쿠폰</p>
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
                </section>
                <section className="mb-30">
                    <div className="coupon-list px-20">
                        <p className="coupon-list-title">사용 가능 쿠폰</p>
                        {
                            userCoupons.data.length > 0 ? (
                                <ul>
                                    {
                                        userCoupons.data.map((coupon)=>{
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
                </section>
            </div>
        </>
    );
}
