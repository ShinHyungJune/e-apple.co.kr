"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import MainTabMenu from "@/components/library/MainTabMenu";

import ProductItemType1 from "@/components/library/ProductItemType1";

export default function Start() {
    const router = useRouter();
    

    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="베스트" />

                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">베스트 20</p>
                    </div>
                    <div className="item-list-type1">
                        <ul>
                            <li>
                                <ProductItemType1/>
                            </li>
                            <li>
                                <ProductItemType1/>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
