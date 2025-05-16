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

import usersApi from "@/lib/api/usersApi";

import ContactInput from "@/components/ContactInput"

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();

    // 번호인증 확인
    const [verifyNumberState, setVerifyNumberState] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        authCode: "",
    });


    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const findId = () => {
        // 번호 인증이 완료되지 않았을 때
        if (!verifyNumberState) {
            dispatch(actions.setMessage("번호 인증을 완료해 주세요."));
            return; // 전송 중단
        }

        // API 요청
        usersApi.findId(form, (response) => {
            let email = response.data.data.email
            console.log(email)
            router.push(`/users/findId/success?email=${email}`);
        });
    };




    return (
        <>
            <Header subTitle={"아이디 찾기"} />

            <div className="body">
                <div className="btn-wrap-fixed">
                    <button onClick={()=>{findId()}} className="btn org">
                        다음
                    </button>
                </div>

                <section>
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
                        <Error name={'username'} />
                    </div>
                </section>
            </div>
        </>
    );
}
