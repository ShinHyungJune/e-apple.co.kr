"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import Pagination from "@/components/Pagination";
import couponsApi from "@/lib/api/couponsApi";
import CouponItem from "@/components/library/CouponItem";

export default function page() {
    const router = useRouter();

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


    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        index()
    }, [form])

    function index() {
        couponsApi.index(form, (response) => {
            setCoupons(response.data);
        })
    }


    if (isClient)
        return (
            <>
                <Header subTitle={'회원등급'} />
                <div className="body">
                    <section className="px-20 pt-20">
                        <div className="user-rank-wrap">
                            <div className="user-rank">
                                <div className="img-wrap">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="label">회원등급</p>
                                    <p className="user-rank">{user?.level}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="price-information-list mb-20 pb-20 px-20 bd-bt">
                            <p className="price-information-title">등급별 혜택</p>
                            <ul>
                                <li>
                                    <div className="price-information">
                                        <p className="label">일반</p>
                                        <p className="price">1% 적립, 이전달 0원 이상 구매</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">FAMILY</p>
                                        <p className="price">2% 적립, 이전달 100,000원 이상 구매</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">VIP</p>
                                        <p className="price">2% 적립, 이전달 100,000원 이상 구매</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="mb-30">
                        <div className="coupon-list px-20">
                            <p className="coupon-list-title">다운로드 가능 쿠폰 목록</p>
                            {
                                coupons.data.length > 0 ? (
                                    <ul>
                                        {
                                            coupons.data.map((coupon) => {
                                                return (
                                                    <li key={coupon.id}>
                                                        <CouponItem coupon={coupon} onSuccess={() => { indexUserCoupons(); indexCoupons(); }} />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                ) : (<NoListData message={"쿠폰이 없습니다."} />)
                            }
                        </div>
                    </section>
                    <section>
                        <div className="gradeNotice-wrap px-20 pt-20 pb-20">
                            <p className="label">등급 유의사항</p>
                            <p className="gradeNotice-content">
                                혜택 이용 시 주의사항, <br />
                                쿠폰이라면 이용기간 등
                            </p>
                        </div>
                    </section>
                </div>
            </>
        );
}
