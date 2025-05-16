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

    const [data, setData] = useState()

    useEffect(() => {
        index()
    }, [])

    function index() {
        mainApi.index({}, (response) => {
            setData(response.data.data);
        })
    }


    return (
        <>
            <div className="gradient-bg"></div>

            <Header />
            <div className="body main-page">
                {
                    data
                    &&
                    <>
                        <MainTabMenu activeTab="전체" />

                        {/* 상단 배너 슬라이드 */}
                        <Section01 banners={data.banners} />
                        {/* 오늘의 특가로 만나는 신선한 과일 */}
                        <Section02 Products={data.saleProducts} />
                        {/* 오늘의 당도 체크 */}
                        <Section03 sweetness={data.sweetness.items} standard_datetime={data.sweetness.standard_datetime} />
                        {/* 열매나무 인기상품 */}
                        <Section04 Products={data.popularProducts} />
                        {/* 이달의 추천 상품 */}
                        <Section05 monthlySuggestionProducts={data.monthlySuggestionProducts} />
                        {/* 베스트 상품 모음 */}
                        <Section06 Products={data.bestProducts} />
                        {/* 과즙이 많은 과일 모음 */}
                        <Section07 Products={data.juicyProducts} />
                        {/* 오늘의 후기 */}
                        <Section08 reviews={data.reviews} />
                    </>
                }
            </div>


        </>
    );
}
