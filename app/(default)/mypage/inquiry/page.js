"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import inquirysApi from "@/lib/api/inquirysApi";

export default function page() {
    const router = useRouter();

    const [visibleItemId, setVisibleItemId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
        category_id: "",
    });
    const [inquirys, setInquirys] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        index()
    }, [form])
    function index() {
        inquirysApi.index(form, (response) => {
            setInquirys(response.data);
            console.log(response.data);
        })
    }


    const destroy = (id) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            inquirysApi.destroy(id, {}, (response) => {
                index()
                alert("삭제되었습니다.");
            });
        }
    };




    return (
        <>
            <Header subTitle={'1:1 문의'} />

            <div className="body">
                <section className="mb-60">
                    <div className="tab-menu-type3 mb-20 mt-10">
                        <div className="tab-menu-bar">
                            <button className="tab-item active">전체</button>
                            <button className="tab-item">답변완료</button>
                            <button className="tab-item">답변대기</button>
                        </div>
                    </div>
                    <div className="section-title-wrap-type3">
                        <p className="section-title">1:1 문의내역</p>
                        <Link href="/mypage/inquiry/create" className="link-txt">
                            1:1 문의 쓰기
                        </Link>
                    </div>
                    <div className="qna-list-type1">
                        {
                            inquirys.data.length > 0 ? (
                                <ul>
                                    {
                                        inquirys.data.map((inquiry, index) => {
                                            const isVisible = visibleItemId == index;

                                            return (
                                                <li key={index}>
                                                    <div className="qna-item-type1">
                                                        <div
                                                            className="qna-item-top"
                                                            onClick={() => {
                                                                if (inquiry.is_answer) {
                                                                    setVisibleItemId(isVisible ? null : index);
                                                                }
                                                            }} // 클릭 시 열고 닫기 (답변 있을 때만)
                                                        >
                                                            <div className="date-btn-wrap">
                                                                <p className="date-txt">2024.00.00</p>
                                                                {inquiry.is_answer ? (
                                                                    <p className="state-txt active">답변완료</p>
                                                                ) : (
                                                                    <p className="state-txt">답변대기</p>
                                                                )}
                                                            </div>
                                                            <div className="category-wrap">
                                                                <p className="category-txt">교환문의</p>
                                                            </div>
                                                            <div className="content-txt-wrap">
                                                                <div className="content-txt">{inquiry.content}</div>
                                                                <div className="btn-wrap">
                                                                    <button
                                                                        className="add-option-btn"
                                                                        onClick={() => {
                                                                            destroy(inquiry.id);
                                                                        }}
                                                                    >
                                                                        삭제
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isVisible && inquiry.is_answer && (
                                                            <div className="qna-item-bt">
                                                                <div className="category-wrap">
                                                                    <p className="category">답변</p>
                                                                </div>
                                                                <div className="content-txt-wrap">
                                                                    <p>{inquiry.answer}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (<NoListData message="문의가 없습니다." />)
                        }

                    </div>
                </section>
            </div>
        </>
    );
}
