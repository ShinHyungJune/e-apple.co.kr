import Link from "next/link";
import React, { useState, useEffect } from "react";
import productsApi from "@/lib/api/productsApi";
import Pagination from "@/components/Pagination";
import Swiper from "swiper";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import NoListData from "@/components/NoListData";
import PopupInquiry from "@/components/popups/PopupInquiry";
import { formatDate } from "@/lib/util/formatDate";
import maskName from "@/lib/util/maskName";

const ProductInquiry = ({ product }) => {
    const user = useSelector(state => state.app.user);

    const [openInquiryId, setOpenInquiryId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
        type: "",
        take: 4,
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
        productsInquiryIndex()
    }, [form])

    function productsInquiryIndex() {
        productsApi.InquiryIndex(product.id, form, (response) => {
            setInquirys(response.data);
        })
    }

    const [targetProduct, setTargetProduct] = useState(null);

    return (
        <>
            <section id="Inquiry" className="pt-30 mb-40">
                <div className="section-title-wrap-type3 mb-20">
                    <p className="section-title">상품 Q&A</p>
                    <button onClick={() => { setTargetProduct(product) }} className="link-txt">
                        Q&A쓰기
                    </button>
                </div>
                <div className="qna-list-type1">
                    {
                        inquirys.data.length > 0 ? (
                            <ul>
                                {inquirys.data.map((inquiry) => (
                                    <li key={inquiry.id}>
                                        <div className="qna-item-type1">
                                            <div
                                                className="qna-item-top"
                                                onClick={() => {
                                                    if (inquiry.is_answered) {
                                                        if (inquiry.is_visible == 0 && inquiry.user_id != user.id) {
                                                            return; // 비밀글 + 작성자 아님 → 열지 마
                                                        }
                                                        setOpenInquiryId((prevId) =>
                                                            prevId === inquiry.id ? null : inquiry.id
                                                        );
                                                    }
                                                }}
                                                style={{ cursor: inquiry.is_answered ? "pointer" : "default" }} // 답변 미완료 시 클릭 불가 표시
                                            >
                                                <div className="date-btn-wrap">
                                                    <p className="date-txt">{maskName(inquiry.user.name)} | {formatDate(inquiry.created_at)}</p>
                                                    <p
                                                        className={`state-txt ${inquiry.is_answered ? "active" : null
                                                            }`}
                                                    >
                                                        {inquiry.is_answered ? "답변완료" : "답변대기"}
                                                    </p>
                                                </div>
                                                <div className="content-txt-wrap">
                                                    <div className="content-txt">
                                                        {inquiry.is_visible == 1 || openInquiryId === inquiry.id ? (
                                                            <p>
                                                                제목: {inquiry.title} <br />
                                                                {inquiry.content}
                                                            </p>
                                                        ) : (
                                                            "비밀글 입니다"
                                                        )}
                                                    </div>
                                                    <div className="btn-wrap">
                                                        <button></button>
                                                    </div>
                                                </div>
                                            </div>
                                            {inquiry.is_answered && openInquiryId == inquiry.id && (
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
                                ))}
                            </ul>
                        ) : (<NoListData />)
                    }

                </div>
                <Pagination
                    form={form}
                    setForm={setForm}
                    meta={inquirys.meta}
                    noScroll={true}
                />
            </section>
            {
                targetProduct ? <PopupInquiry product={targetProduct} setProduct={setTargetProduct} onSuccess={() => { productsInquiryIndex() }} /> : null
            }
        </>

    );
};

export default ProductInquiry;
