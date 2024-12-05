"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import EditorContent from "@/components/EditorContent";
import { StateBoards } from "@/enums/stateBoards";
import boardsApi from "@/lib/api/boardsApi";



export default function page(props) {
    const router = useRouter();
    const id = props.params.id;
    
    // // 스토리 하위 카테고리
    // useEffect(() => {
    //     boardsInit()
    // }, [])
    // function boardsInit() {
    //     boardsApi.init(StateBoards.STORY, form, (response) => {
    //         setInitStorys(response.data.data.category_items);
    //     })
    // }

    // // 스토리 api
    // useEffect(() => {
    //     boardsIndex()
    // }, [form])
    // function boardsIndex() {
    //     boardsApi.index(StateBoards.STORY, form, (response) => {
    //         setStorys(response.data);
    //     })
    // }

    return (
        <>
            <Header />

            <div className="body main-page">
                <section className="mb-60 mt-35">
                    <div className="board-title-wrap px-20 mb-40">
                        <p className="board-title mb-20">열매나무 스토리</p>
                        <p className="board-date">23.10.10 ~ 23.10.31</p>
                    </div>
                    <div className="board-content-wrap">
                        <EditorContent description={"asdasd"} />
                    </div>
                </section>
            </div>
        </>
    );
}
