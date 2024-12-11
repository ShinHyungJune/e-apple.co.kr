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
import NoListData from "@/components/NoListData";
import Pagination from "@/components/Pagination";
import { StateBoards } from "@/enums/stateBoards";
import boardsApi from "@/lib/api/boardsApi";
import { formatDate } from "@/lib/util/formatDate";


export default function page() {
    const router = useRouter();

    // 개시판 하위 카테고리
    const [initStorys, setInitStorys] = useState([])

    const [form, setForm] = useState({
        page: 1,
        category_id: "",
    });

    const [storys, setStorys] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    // 스토리 하위 카테고리
    useEffect(() => {
        boardsInit()
    }, [])
    function boardsInit() {
        boardsApi.init(StateBoards.STORY, form, (response) => {
            setInitStorys(response.data.data.category_items);
        })
    }

    // 스토리 api
    useEffect(() => {
        boardsIndex()
    }, [form])
    function boardsIndex() {
        boardsApi.index(StateBoards.STORY, form, (response) => {
            setStorys(response.data);
        })
    }

    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="스토리" />

                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">열매나무 스토리</p>
                    </div>
                    <div className="tab-menu-type1">
                        <ul>
                            <li
                                className={form.category_id == "" ? "active" : ""}
                                onClick={() =>
                                    setForm((prevForm) => ({
                                        ...prevForm,
                                        category_id: "",
                                    }))
                                }
                            >
                                전체
                            </li>
                            {initStorys.map((initStory) => (
                                <li
                                    key={initStory.value}
                                    className={form.category_id == initStory.value ? "active" : ""}
                                    onClick={() =>
                                        setForm((prevForm) => ({
                                            ...prevForm,
                                            category_id: initStory.value,
                                        }))
                                    }
                                >
                                    {initStory.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="info-list-type1">
                        {
                            storys.data.length > 0 ? (
                                <ul>
                                    {
                                        storys.data.map((story)=>{
                                            return(
                                                <li key={story.id}>
                                                    <div className="info-item-type1">
                                                        <Link href={`/storys/${story.id}`} className="info-item-img-wrap">
                                                            <img src={story.file.url} alt={story.title} />
                                                        </Link>
                                                        <div className="info-item-content-wrap">
                                                            <Link href={`/storys/${story.id}`} className="item-name">{story.title}</Link>
                                                            <p className="date">{formatDate(story.created_at)}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (
                                <NoListData message="스토리가 없습니다." />
                            )
                        }
                    </div>

                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={storys.meta}
                    />
                </section>
            </div>
        </>
    );
}
