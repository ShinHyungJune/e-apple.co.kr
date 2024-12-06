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
import Section01 from "@/components/mainComponents/Section01";
import Section02 from "@/components/mainComponents/Section02";
import Section03 from "@/components/mainComponents/Section03";
import Section04 from "@/components/mainComponents/Section04";
import Section05 from "@/components/mainComponents/Section05";
import Section06 from "@/components/mainComponents/Section06";
import Section07 from "@/components/mainComponents/Section07";
import Section08 from "@/components/mainComponents/Section08";

export default function Start() {
    const router = useRouter();
    // const categories = useSelector(state => state.app.categories);


    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="전체"/>

                <Section01/>
                <Section02/>
                <Section03/>
                <Section04/>
                <Section05/>
                <Section06/>
                <Section07/>
                <Section08/>
            </div>
        </>
    );
}
