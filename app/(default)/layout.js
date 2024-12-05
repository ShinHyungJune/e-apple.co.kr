"use client";
import "@/public/css/swiper.min.css";
import "@/public/css/module.css";
import "@/public/css/quill.css";
import "@/public/css/common.css";
import "@/public/css/style.css";


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actions } from "@/app/store";
import Script from "next/script";


// import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    userScalable: false,
};

// api
import usersApi from "@/lib/api/usersApi";

import BottomNav from "@/components/library/BottomNav";

export default function Layout({ children }) {

    const dispatch = useDispatch(); // Redux dispatch 사용

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    useEffect(()=>{
        dispatch(actions.setGuestId());

        if (user)
            usersApi.show();
    },[])

    



    return (
        <>
            {/* 다음주소검색 */}
            <Script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
            {/* 아이포트 */}
            <Script src="//cdn.iamport.kr/v1/iamport.js" />
            {/* <Header /> */}
            <div className="body-wrap">
                {children}
                <BottomNav/>
                <Footer />
            </div>
        </>
    );
}
