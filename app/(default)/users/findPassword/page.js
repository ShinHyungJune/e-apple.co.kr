"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";

import passwordsApi from "@/lib/api/passwordsApi";

import ContactInput from "@/components/ContactInput"

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();

    // 번호인증 확인
    const [verifyNumberState, setVerifyNumberState] = useState(false);

    const [form, setForm] = useState({
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const findPassword = () => {
        // 번호 인증이 완료되지 않았을 때
        if (!verifyNumberState) {
            dispatch(actions.setMessage("번호 인증을 완료해 주세요."));
            return; // 전송 중단
        }

        // API 요청
        passwordsApi.resetPassword(form, (response) => {
            router.push("/users/findPassword/success");
        });
    };




    return (
        <>
            <Header subTitle={"비밀번호 찾기"} />

            <div className="body">
                {/* 다음 버튼 */}
                <div className="btn-wrap-fixed">
                    <button onClick={()=>{findPassword()}} className="btn org">
                        다음
                    </button>
                </div>

                <section>
                    {/* 이메일 입력 */}
                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">이메일(아이디)</p>
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeForm}
                                    placeholder="이메일 (이메일은 아이디로 사용됩니다)"
                                />
                            </div>
                            <Error name={'email'} />
                        </div>
                    </div>

                    {/* 연락처 입력 */}
                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                연락처 <span className="required">*</span>
                            </p>
                        </div>
                        <div>
                            <ContactInput
                                contactValue={form.phone}
                                authCodeValue={form.authCode}
                                verifyNumberState={verifyNumberState}
                                setVerifyNumberState={setVerifyNumberState}
                                onChange={changeForm}
                            />
                        </div>
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="input-list-type2 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                새로운 비밀번호를 입력해주세요. <span className="required">*</span>
                            </p>
                        </div>
                       <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeForm}
                                    placeholder="비밀번호 (영문+숫자+특수문자 조합의 비밀번호 8자 이상)"
                                />
                            </div>
                            <Error name={'password'} />
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={form.password_confirmation}
                                    onChange={changeForm}
                                    placeholder="비밀번호 재확인"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
