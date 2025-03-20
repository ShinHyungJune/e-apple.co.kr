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

    // 개시판 하위 카테고리
    const [initFaqs, setInitFaqs] = useState([])

    const [form, setForm] = useState({
        page: 1,
        category_id: "",
    });

    const [faqs, setFaqs] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    useEffect(() => {
        boardsInit()
    }, [])
    function boardsInit() {
        boardsApi.init(StateBoards.FAQ, form, (response) => {
            setInitFaqs(response.data.data.category_items);
        })
    }

    console.log(faqs);

    useEffect(() => {
        boardsIndex()
    }, [form])
    function boardsIndex() {
        boardsApi.index(StateBoards.FAQ, form, (response) => {
            setFaqs(response.data);
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

            <div className="body">
                <div className="tab-menu-type2">
                    <ul>
                        <li className="active">
                            <Link href="/faqs">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/notices">공지사항</Link>
                        </li>
                    </ul>
                </div>

                <section className="mb-60">
                    <div className="tab-menu-type3 mb-10 mt-10">
                        <div className="tab-menu-bar">
                            <button 
                                className={"tab-item" + (form.category_id == "" ? " active" : "")}
                                onClick={() =>
                                    setForm((prevForm) => ({
                                        ...prevForm,
                                        category_id: "",
                                    }))
                                }
                            >전체</button>
                            {
                                initFaqs.map((initFaq)=>{
                                    return(
                                        <button 
                                            key={initFaq.value} 
                                            className={"tab-item " + (form.category_id == initFaq.value ? " active" : "")}
                                            onClick={() =>
                                                setForm((prevForm) => ({
                                                    ...prevForm,
                                                    category_id: initFaq.value,
                                                }))
                                            }
                                        >{initFaq.text}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="qna-list-type1">
                        {
                            faqs.data.length > 0 ? (
                                <ul>
                                    {faqs.data.map((faq) => {
                                        const isVisible = visibleItemId == faq.id;

                                        // category text 찾기
                                        const category = initFaqs.find(item => item.value == faq.category_id);

                                        return (
                                            <li key={faq.id}>
                                                <div className="qna-item-type1">
                                                    <div
                                                        className="qna-item-top"
                                                        onClick={() =>
                                                            setVisibleItemId(isVisible ? null : faq.id)
                                                        } // 클릭 시 열고 닫기
                                                    >
                                                        <div className="category-wrap">
                                                            <p className="category-txt">
                                                                {category ? category.text : ""}
                                                            </p>
                                                        </div>
                                                        <div className="content-txt-wrap">
                                                            <div className="content-txt">
                                                                {faq.title}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {isVisible && (
                                                        <div className="qna-item-bt">
                                                            <div className="category-wrap">
                                                                <p className="category">A</p>
                                                            </div>
                                                            <div className="content-txt-wrap">
                                                                <p>
                                                                    {faq.content}
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
                                <NoListData message="FAQ가 없습니다." />
                            )
                        }
                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={faqs.meta}
                    />
                </section>
            </div>
        </>
    );
}
