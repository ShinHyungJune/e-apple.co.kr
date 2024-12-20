"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import productsApi from "@/lib/api/productsApi";

export default function page() {
    const router = useRouter();

    return (
        <>
            <Header />
            <div className="body">
                <section className="mypage-section">
                    {/* 상단 사용자 정보 */}
                    <div className="mypage-top-box">
                        <div className="user-name-wrap">
                            <p className="user-name">user name</p>
                        </div>
                        <div className="user-rank-wrap">
                            <div className="user-rank">
                                <div className="img-wrap">
                                    <img src="/asset/images/test-img.png" alt="" />
                                </div>
                                <div className="txt-wrap">
                                    <p className="label">회원등급</p>
                                    <p className="user-rank">FAMILY</p>
                                </div>
                            </div>
                        </div>
                        <div className="coupon-points-wrap">
                            <div className="coupon-wrap">
                                <p className="label">사용 가능 쿠폰</p>
                                <p className="amount">24</p>
                            </div>
                            <div className="points-wrap">
                                <p className="label">적립금</p>
                                <p className="amount">29,080</p>
                            </div>
                        </div>
                    </div>

                    {/* 마이페이지 메뉴 */}
                    <div className="mypage-menu-list-type1 mb-40">
                        <div className="mypage-menu">
                            <p className="mypage-menu-title">나의 쇼핑 정보</p>
                            <ul>
                                <li>
                                    <Link href="/deliveryTracking.html">주문/배송 조회</Link>
                                </li>
                                <li>
                                    <Link href="/deliveryTracking.html">취소/교환/반품 조회</Link>
                                </li>
                                <li>
                                    <Link href="/reviewSubmit.html">상품 리뷰</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mypage-menu">
                            <p className="mypage-menu-title">고객센터</p>
                            <ul>
                                <li>
                                    <Link href="/productInquiry.html">상품 문의</Link>
                                </li>
                                <li>
                                    <Link href="/mypage/inquiry/">1:1 문의</Link>
                                </li>
                                <li>
                                    <Link href="/faq.html">고객센터</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mypage-menu">
                            <p className="mypage-menu-title">계정정보</p>
                            <ul>
                                <li>
                                    <Link href="/editMemberInfo.html">회원정보 수정</Link>
                                </li>
                                <li>
                                    <Link href="/membershipLevel.html">회원등급</Link>
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
                                <li>
                                    <Link href="">브랜드 소개</Link>
                                </li>
                                <li>
                                    <Link href="">배송 및 이용 안내</Link>
                                </li>
                                <li>
                                    <Link href="">개인정보처리방침</Link>
                                </li>
                                <li>
                                    <Link href="">이용약관</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 로그아웃 버튼 */}
                    <div className="underline-btn-wrap mb-60">
                        <button className="underline-btn">로그아웃</button>
                    </div>
                </section>
            </div>
        </>
    );
}
