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

    const [visibleItemId, setVisibleItemId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
    });

    const [notices, setNotices] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        boardsIndex()
    }, [form])
    function boardsIndex() {
        boardsApi.index(StateBoards.NOTICE, form, (response) => {
            setNotices(response.data);
        })
    }

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    };

    return (
        <>
            <Header subTitle={"공지사항"}/>

            <div className="body main-page">
                <div className="tab-menu-type2">
                    <ul>
                        <li>
                            <Link href="/faqs">FAQ</Link>
                        </li>
                        <li className="active">
                            <Link href="/notices">공지사항</Link>
                        </li>
                    </ul>
                </div>

                <section className="mb-60">
                    <div className="qna-list-type1">
                        {
                            notices.data.length > 0 ? (
                                <ul>
                                    {notices.data.map((notice) => {
                                        const isVisible = visibleItemId === notice.id;

                                        return (
                                            <li key={notice.id}>
                                                <div className="qna-item-type1">
                                                    <div
                                                        className="qna-item-top"
                                                        onClick={() =>
                                                            setVisibleItemId(isVisible ? null : notice.id)
                                                        } // 클릭 시 열고 닫기
                                                    >
                                                        <div className="content-txt-wrap">
                                                            <div className="title-txt">
                                                                {notice.title}
                                                            </div>
                                                            <div className="date-wrap">
                                                                <p>{formatDate(notice.created_at)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {isVisible && ( // 항목이 열렸을 때만 보이게 함
                                                        <div className="qna-item-bt">
                                                            <div className="content-txt-wrap">
                                                                <p style={{ whiteSpace: "pre-line"}}>
                                                                    {notice.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <NoListData message="공지사항이 없습니다." />
                            )
                        }
                       
                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={notices.meta}
                    />
                </section>
            </div>
        </>
    );
}
