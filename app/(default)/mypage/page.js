"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
import { actions } from "@/app/store";
// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import productsApi from "@/lib/api/productsApi";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);


    // 로그아웃
    function logout() {
        dispatch(actions.logout());
        router.push('/login');
    }


    return (
        <>
            <Header />
            <div className="body">
                {
                    isClient &&
                    <section className="mypage-section pt-20">
                        {/* 상단 사용자 정보 */}
                        <div className="mypage-top-box">
                            <div className="user-name-wrap">
                                <p className="user-name">{user?.name}{user?.nickname ? <span>({user?.nickname})</span> :""}</p>
                                <p className="user-email">{user?.email}</p>
                            </div>
                            <div className="user-rank-wrap">
                                <div className="user-rank">
                                    <div className="img-wrap">
                                        {/* <img src="/asset/images/test-img.png" alt="" /> */}
                                        <i className="xi-user-o"></i>
                                    </div>
                                    <div className="txt-wrap">
                                        <p className="label">회원등급</p>
                                        <p className="user-rank">{user?.level}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="coupon-points-wrap">
                                <div className="coupon-wrap">
                                    <p className="label">사용 가능 쿠폰</p>
                                    <p className="amount">{user?.available_coupons_count}</p>
                                </div>
                                <div className="points-wrap">
                                    <p className="label">적립금</p>
                                    <p className="amount">{user?.points?.toLocaleString() || "0"}</p>
                                </div>
                            </div>
                        </div>

                        {/* 마이페이지 메뉴 */}
                        <div className="mypage-menu-list-type1 mb-40">
                            <div className="mypage-menu">
                                <p className="mypage-menu-title">나의 쇼핑 정보</p>
                                <ul>
                                    <li>
                                        <Link href="/mypage/orders">주문/배송 조회</Link>
                                    </li>
                                    {/* <li>
                                    <Link href="/deliveryTracking.html">취소/교환/반품 조회</Link>
                                </li> */}
                                    <li>
                                        <Link href="/mypage/review/available">상품 리뷰</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mypage-menu">
                                <p className="mypage-menu-title">고객센터</p>
                                <ul>
                                    <li>
                                        <Link href="/mypage/productsInquiries">상품 문의</Link>
                                    </li>
                                    <li>
                                        <Link href="/mypage/inquiries">1:1 문의</Link>
                                    </li>
                                    <li>
                                        <Link href="/faqs">고객센터</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mypage-menu">
                                <p className="mypage-menu-title">계정정보</p>
                                <ul>
                                    <li>
                                        <Link href="/mypage/users">회원정보 수정</Link>
                                    </li>
                                    <li>
                                        <Link href="/mypage/membershipLevel">회원등급</Link>
                                    </li>
                                    <li>
                                        <Link href="/mypage/coupons">사용가능 쿠폰</Link>
                                    </li>
                                    <li>
                                        <Link href="/mypage/points">적립금</Link>
                                    </li>
                                    <li>
                                        <Link href="/mypage/deliveryAddresses">배송지 관리</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mypage-menu">
                                <p className="mypage-menu-title">열매나무</p>
                                <ul>
                                    {/* <li>
                                    <Link href="">브랜드 소개</Link>
                                </li>
                                <li>
                                    <Link href="">배송 및 이용 안내</Link>
                                </li> */}
                                    <li>
                                        <Link href="/contents/privacyPolicy">개인정보처리방침</Link>
                                    </li>
                                    <li>
                                        <Link href="/contents/termsOfService">이용약관</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 로그아웃 버튼 */}
                        <div className="underline-btn-wrap mb-60">
                            <button onClick={() => { logout() }} className="underline-btn">로그아웃</button>
                        </div>
                    </section>
                }

            </div>
        </>
    );
}
