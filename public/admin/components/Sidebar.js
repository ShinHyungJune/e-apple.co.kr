// components/Sidebar.js
'use client';
import React from 'react';
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <h3 className="title">관리자</h3>
            </div>

            <div className="menus-wrap">
                <div className="menus m-scrollbar type01">
                    <div className="menu-wrap">
                        <p className="menu">
                            <i className="xi-arrow-down"></i>
                            사이트 관리
                        </p>

                        <div className="menus">
                            <div className="menu-wrap">
                                <Link href="/admin/mainBanners" className="menu">메인배너</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/middleBanners" className="menu">중간배너</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/bandBanners" className="menu">띠배너</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/categories" className="menu">카테고리</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/recommendCategories" className="menu">추천 카테고리</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/events" className="menu">이벤트</Link>
                            </div>
                             <div className="menu-wrap">
                                <Link href="/admin/faqs" className="menu">FAQ</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/notices" className="menu">공지사항</Link>
                            </div>

                            <div className="menu-wrap">
                                <Link href="/admin/couponGroups" className="menu">쿠폰</Link>
                            </div>
                        </div>
                    </div>
                    <div className="menu-wrap">
                        <p className="menu">
                            <i className="xi-arrow-down"></i>
                            고객관리
                        </p>

                        <div className="menus">
                             <div className="menu-wrap">
                                <Link href="/admin/users" className="menu">사용자</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/estimates" className="menu">견적요청</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/qnas" className="menu">문의사항</Link>
                            </div>

                        </div>
                    </div>
                    <div className="menu-wrap">
                        <p className="menu">
                            <i className="xi-arrow-down"></i>
                            주문관리
                        </p>

                        <div className="menus">
                            <div className="menu-wrap">
                                <Link href="/admin/products" className="menu">상품</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/reviews" className="menu">리뷰</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/orders" className="menu">주문</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/presetProducts" className="menu">출고</Link>
                            </div>
                            <div className="menu-wrap">
                                <Link href="/admin/refunds" className="menu">교환요청</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
