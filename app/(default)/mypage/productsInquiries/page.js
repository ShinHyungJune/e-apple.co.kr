"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import inquiriesApi from "@/lib/api/inquiriesApi";

export default function page() {
    const router = useRouter();

    const [visibleItemId, setVisibleItemId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
        is_answered: null,
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
        inquiriesApi.indexProductsInquiries(form, (response) => {
            setInquirys(response.data);
        })
    }


    const destroy = (id) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            inquiriesApi.destroy(id, {}, (response) => {
                index()
                alert("삭제되었습니다.");
            });
        }
    };




    return (
        <>
            <Header subTitle={'상품문의'} />

            <div className="body">
                <section className="mb-60">
                    <div className="tab-menu-type3 mb-20 mt-10">
                        <div className="tab-menu-bar">
                            <button
                                className={`tab-item ${form.is_answered == null ? 'active' : ''}`}
                                onClick={() => setForm((prevForm) => ({ ...prevForm, is_answered: null }))}
                            >
                                전체
                            </button>
                            <button
                                className={`tab-item ${form.is_answered == 1 ? 'active' : ''}`}
                                onClick={() => setForm((prevForm) => ({ ...prevForm, is_answered: 1 }))}
                            >
                                답변완료
                            </button>
                            <button
                                className={`tab-item ${form.is_answered == 0 ? 'active' : ''}`}
                                onClick={() => setForm((prevForm) => ({ ...prevForm, is_answered: 0 }))}
                            >
                                답변대기
                            </button>
                        </div>
                    </div>
                    <div className="section-title-wrap-type3">
                        <p className="section-title">상품 Q&A</p>
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
                                                                if (inquiry.is_answered) {
                                                                    setVisibleItemId(isVisible ? null : index);
                                                                }
                                                            }} // 클릭 시 열고 닫기 (답변 있을 때만)
                                                        >
                                                            <div className="date-btn-wrap">
                                                                <p className="date-txt">{inquiry.created_at}</p>
                                                                {inquiry.is_answered ? (
                                                                    <p className="state-txt active">답변완료</p>
                                                                ) : (
                                                                    <p className="state-txt">답변대기</p>
                                                                )}
                                                            </div>
                                                            <div className="category-wrap">
                                                                <p className="category-txt">{inquiry.product.name}</p>
                                                            </div>
                                                            <div className="content-txt-wrap">
                                                                <div className="content-txt">
                                                                    제목: {inquiry.title} <br />
                                                                    {inquiry.content}
                                                                </div>
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
                                                        {isVisible && inquiry.is_answered && (
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
