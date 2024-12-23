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
import Pagination from "@/components/Pagination";

export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({
        take: "4",
    });
    const [userCoupons, setUserCoupons] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
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
        IndexUserCoupons()
        IndexCoupons()
    }, [form])
    function IndexUserCoupons() {
        couponsApi.indexUserCoupons({}, (response) => {
            setUserCoupons(response.data);
        })
    }

    function IndexCoupons() {
        couponsApi.index(form, (response) => {
            setCoupons(response.data);
        })
    }





    return (
        <>
            <Header subTitle={'사용가능 쿠폰'} />

            <div className="body">
                <section className="mb-30 pt-30">
                    <div className="coupon-list px-20">
                        <p className="coupon-list-title">다운로드 가능 쿠폰 목록</p>
                        {
                            coupons.data.length > 0 ? (
                                <ul>
                                    {
                                        coupons.data.map((coupon)=>{
                                            return(
                                                <li key={coupon.id}>
                                                    <CouponItem coupon={coupon} onSuccess={()=>{IndexUserCoupons(); IndexCoupons();}}/>
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
                </section>
                <section className="mb-30 mt-80">
                    <div className="coupon-list px-20">
                        <p className="coupon-list-title">사용 가능 쿠폰</p>
                        {
                            userCoupons.data.length > 0 ? (
                                <ul>
                                    {
                                        userCoupons.data.map((coupon)=>{
                                            return(
                                                <li key={coupon.id}>
                                                    <CouponItem coupon={coupon} onSuccess={()=>{IndexUserCoupons(); IndexCoupons();}}/>
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
