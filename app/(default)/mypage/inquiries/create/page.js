"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import AddressInput from "@/components/AddressInput";

import inquiriesApi from "@/lib/api/inquiriesApi";

import InputImages from "@/components/InputImages";

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        type: "",
        content: "",
        imgs: [],
    });

    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const store = () => {
        inquiriesApi.store(form, (response) => {
            let message = response.data.message
            dispatch(actions.setMessage(message));
            router.back();
        });
    };

    

    return (
        <>
            <Header subTitle={'1:1 문의'} />

            <div className="body">
                <div className="btn-wrap-fixed">
                    <button className="btn org" onClick={()=>{store()}}>등록하기</button>
                </div>

                <section>
                    <div className="info-message-type1 mb-20 pt-20 px-20">
                        <p className="bd-bt-sm pb-20">
                            산업안전보건법 제 41조 시행령에 근거하여 2018년 10월 18일 부터
                            산업안전보건법에 따라 고객응대근로자 보호조치를 시행하고 있습니다.
                            고객응대근로자에게 폭언, 폭행 등을 하지 말아주세요.
                        </p>
                    </div>

                    <div className="input-list-type2 pb-20 px-20 mb-10">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">어떤 문제가 있나요?</p>
                        </div>
                        <div>
                            <div className="radiobox-list-type2 mb-20">
                                <h3 className="radiobox-title">구매관련문의</h3>
                                {["배송문의", "주문문의", "취소문의", "교환문의", "환불문의", "입금문의"].map((item) => (
                                    <div className="radiobox" key={item}>
                                        <input
                                            type="radio"
                                            id={item}
                                            name="type"
                                            value={item}
                                            checked={form.type === item}
                                            onChange={changeForm}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="radiobox-list-type2">
                                <h3 className="radiobox-title">일반상담문의</h3>
                                {["회원정보", "결제문의", "상품문의", "쿠폰/마일리지", "기타"].map((item) => (
                                    <div className="radiobox" key={item}>
                                        <input
                                            type="radio"
                                            id={item}
                                            name="type"
                                            value={item}
                                            checked={form.type === item}
                                            onChange={changeForm}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="input-list-type2 px-20 mb-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">상세설명</p>
                        </div>
                        <div>
                            <div className="textarea-box-type1">
                                <textarea
                                    name="content"
                                    id="details"
                                    placeholder="상세내용을 입력해주세요."
                                    value={form.content}
                                    onChange={changeForm}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="input-list-type2 pb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">사진첨부</p>
                        </div>
                        <div className="input-list-sub-title-wrap">
                            <p className="input-list-sub-title">
                                사진은 최대 20MB 이하의 JPG, PNG, GIF 파일로 첨부 가능합니다.
                            </p>
                        </div>
                        <div>
                            <InputImages
                                multiple={true}
                                defaultValue={[]}
                                onChange={(data) => {setForm({ ...form, imgs: data })}}
                                onRemove={(data) => {setForm({...form, imgs_remove_ids: data})}}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
