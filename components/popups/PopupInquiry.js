import React, { useState, useEffect } from "react";
import productsApi from "@/lib/api/productsApi";


const PopupInquiry = ({ product, setProduct, onSuccess }) => {

    const [form, setForm] = useState({
        product_id: product.id,
        title: "",
        content: "",
        is_visible: "1",
    });

    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? (checked ? "0" : "1") : value, // 체크박스는 "0" 또는 "1"
        });
    };


    const store = () => {
        // API 요청
        productsApi.InquiryStore(product.id, form, (response) => {
            setProduct(null);
            onSuccess();
        });
    };

    return (
        <div className="popup-wrap">
            <div className="popup-wrap-bg"></div>
            <div className="popup-box-type2">
                <div className="popup-close-btn-wrap">
                    <p className="popup-title">상품문의</p>
                    <button className="popup-close-btn" onClick={() => { setProduct(false) }}><i className="xi-close"></i></button>
                </div>

                <div className="popup-content-wrap pt-20">
                    <div className="item-wrap-type3 mt-30 mb-30">
                        <div className="item-type3">
                            <div className="item-img-wrap">
                                <div className="img">
                                    <img src={product.img.url} alt={product.img.name} />
                                </div>
                            </div>
                            <div className="item-content-wrap">
                                <p className="item-name">
                                    {product.name}
                                </p>
                                <div className="price-wrap">
                                    <p className="discounted-price">{product.price.toLocaleString()}원</p>
                                    <p className="original-price">{product.original_price.toLocaleString()}</p>
                                </div>
                                <div className="sub-content">
                                    <p>
                                        <i className="xi-star-o"></i>
                                        {product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}
                                    </p>
                                    <p>
                                        <i className="xi-eye-o"></i>{product.view_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="input-list-type1 mb-20">
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={changeForm}
                                    placeholder="제목을 입력해주세요."
                                />
                            </div>
                        </div>
                        <div>
                            <div className="textarea-box-type1">
                                <textarea
                                    name="content"
                                    value={form.content}
                                    onChange={changeForm}
                                    rows="8"
                                    placeholder="내용을 입력해주세요."
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <div className="checkbox-list-type1">
                            <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="is_visible"
                                        id="checkbox-01"
                                        checked={form.is_visible === "0"} // "0"이 체크된 상태
                                        onChange={changeForm}
                                    />
                                    <label htmlFor="checkbox-01">비밀글</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="btn-wrap-type1 mb-40">
                        <button className="btn org" onClick={() => { store() }}>등록하기</button>
                    </div>

                    <div className="info-message-type1 mb-60 px-20">
                        <p>
                            개인정보(이름, 연락처, 주소, 이메일, 환불계좌)가 포함된 글은 비밀 글로 등록해 주세요.
                        </p>
                        <p>
                            부적절한 게시물 등록 시 이용제한 및 게시물이 삭제될 수 있습니다. (비방, 광고, 개인정보
                            노출 위험이 있는 글 등)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupInquiry;
