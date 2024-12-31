"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

import mainApi from "@/lib/api/mainApi";

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

    useEffect(()=>{
        index()
    },[])

    function index() {
        mainApi.index({}, (response) => {
            console.log(response);
        })
    }
    

    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="전체"/>

                {/* 상단 배너 슬라이드 */}
                <Section01/>
                {/* 오늘의 특가로 만나는 신선한 과일 */}
                <Section02/>
                {/* 오늘의 당도 체크 */}
                <Section03/>
                {/* 열매나무 인기상품 */}
                <Section04/>
                {/* 이달의 추천 상품 */}
                <Section05/>
                {/* 베스트 상품 모음 */}
                <Section06/>
                {/* 과즙이 많은 과일 모음 */}
                <Section07/>
                {/* 오늘의 후기 */}
                <Section08/>
            </div>
        </>
    );
}
