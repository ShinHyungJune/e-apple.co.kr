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



export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({
        page: 1,
    });

    const [events, setEvents] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    // 스토리 api
    useEffect(() => {
        boardsIndex()
    }, [form])
    function boardsIndex() {
        boardsApi.index(StateBoards.EVENT, form, (response) => {
            setEvents(response.data);
        })
    }

    return (
        <>
            <div className="gradient-bg"></div>

            <Header />

            <div className="body main-page">
                <MainTabMenu activeTab="이벤트" />

                <section className="mb-60 mt-35">
                    <div className="section-title-wrap-type1">
                        <p className="section-title">이달의 이벤트</p>
                    </div>
                    <div className="info-list-type1">
                        {
                            events.data.length > 0 ? (
                                <ul>
                                    {
                                        events.data.map((event) => {
                                            const isEnded = new Date(event.end_date) < new Date(); // 마감 여부 확인
        
                                            return (
                                                <li key={event.id}>
                                                    <div className={`info-item-type1 ${isEnded ? "Ended" : ""}`}>
                                                        <Link href={`/events/${event.id}`} className="info-item-img-wrap">
                                                            <img src="/asset/images/test-img.png" alt="" />
                                                            {isEnded && (
                                                                <div className="Ended-box">
                                                                    <p>이벤트 종료</p>
                                                                </div>
                                                            )}
                                                        </Link>
                                                        <div className="info-item-content-wrap">
                                                            <Link href={`/events/${event.id}`} className="item-name">{event.title}</Link>
                                                            <p className="date">
                                                                {event.start_date} ~ {event.end_date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            ) : (
                                <NoListData message="이벤트가 없습니다." />
                            )
                        }
                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={events.meta}
                    />
                </section>
            </div>
        </>
    );
}
