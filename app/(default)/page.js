"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Section01 from "@/components/mainComponents/Section01";


export default function Start() {
    const router = useRouter();
    // const categories = useSelector(state => state.app.categories);

    const [loading, setLoading] = useState(false)


    return (
        <>
            <div className="gradient-bg"></div>

            

            <div className="body main-page">
                <div className="main-tab-menu">
                    <div className="tab-menu-bar">
                        <a href="/" className="tab-item">전체</a>
                        <a href="/" className="tab-item">추천</a>
                        <a href="/bast.html" className="tab-item">베스트</a>
                        <a href="/gift.html" className="tab-item">선물</a>
                        <a href="/story.html" className="tab-item">스토리</a>
                        <a href="/event.html" className="tab-item ">이벤트</a>
                    </div>
                </div>

                <Section01/>
            </div>
        </>
    );
}
