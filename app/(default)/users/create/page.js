"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";

import usersApi from "@/lib/api/usersApi";

import ContactInput from "@/components/ContactInput"

import AddressInput from "@/components/AddressInput";

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();


    // 번호인증 확인
    const [verifyNumberState, setVerifyNumberState] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        phone: "",
        nickname: "",

        postal_code: "",
        address: "",
        address_detail: "",

        agreeAll: false,
        agreeTerms: false,
        agreePrivacy: false,
        // agreePayment: false,
        is_agree_promotion: false
    });


    useEffect(() => {
        if(searchParams.get('socialUser')) {
            const socialUser = JSON.parse(searchParams.get('socialUser'));

            setForm({
                ...form,
                contact: socialUser.contact,
                name: socialUser.name,
                email: socialUser.email,
                social_id: socialUser.id,
                social_platform: socialUser.platform,
            });
        }
    }, []);



    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };



    const store = () => {
        
        // 필수 약관 동의가 false일 때
        if (!form.agreeTerms || !form.agreePrivacy) {
            dispatch(actions.setMessage("필수 약관에 동의해 주세요."));
            return; // 전송 중단
        }

        // 번호 인증이 완료되지 않았을 때
        if (!verifyNumberState) {
            dispatch(actions.setMessage("번호 인증을 완료해 주세요."));
            return; // 전송 중단
        }

        // agree_promotion_sms 값 처리 (false면 0, true면 1로 변환)
        let formDataToSend = {
            ...form,
            agree_promotion_sms: form.agree_promotion_sms ? 1 : 0
        };

        // API 요청
        usersApi.store(formDataToSend, (response) => {
            router.push("/users/create/success");
        });
    };


    return (
        <>
            <Header subTitle={"일반 회원가입"} />

            <div className="body">
                <section>
                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                아이디 <span className="required">*</span>
                            </p>
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={changeForm}
                                    placeholder="아이디"
                                />
                            </div>
                            <Error name={'username'} />
                        </div>
                    </div>
                     <div className="input-list-type2 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                비밀번호 <span className="required">*</span>
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
                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                이메일 <span className="required">*</span>
                            </p>
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeForm}
                                    placeholder="이메일"
                                />
                            </div>
                            <Error name={'email'} />
                        </div>
                    </div>
                   
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


                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                주소 <span className="required">*</span>
                            </p>
                        </div>
                        <div className="address-input-wrap-type1">
                           <AddressInput form={form} setForm={setForm} />
                        </div>
                    </div>



                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">
                                성명 <span className="required">*</span>
                            </p>
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={changeForm}
                                    placeholder="성명을 입력해주세요."
                                />
                            </div>
                            <Error name={'name'} />
                        </div>
                    </div>
                    <div className="input-list-type2 mt-20 mb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">닉네임</p>
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="nickname"
                                    value={form.nickname}
                                    onChange={changeForm}
                                    placeholder="닉네임을 입력해주세요."
                                />
                            </div>
                            <Error name={'nickname'} />
                        </div>
                    </div>
                </section>

                <section className="pt-20 pb-20">
                    <div className="agreement-checkbox-list px-20 mb-50">
                        <div className="agreement-checkbox-list-all">
                            <div className="checkbox-type1">
                                <input
                                    type="checkbox"
                                    name="agreeAll"
                                    id="agreeAll"
                                    checked={
                                        form.agreeTerms
                                        &&
                                        form.agreePrivacy
                                        // && 
                                        // form.agree_promotion_sms
                                    }
                                    onChange={(e) => {
                                        const { checked } = e.target;
                                        setForm({
                                            ...form,
                                            agreeTerms: checked,
                                            agreePrivacy: checked,
                                            agreePayment: checked,
                                            // agree_promotion_sms: checked,
                                        });
                                    }}
                                />
                                <label htmlFor="agreeAll">전체 동의하기</label>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        id="agreeTerms"
                                        checked={form.agreeTerms}
                                        onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                                    />
                                    <label htmlFor="agreeTerms">[필수] 개인정보처리 동의</label>
                                </div>
                                <Link href="/contents/privacyPolicy" >상세보기</Link>
                            </li>
                            <li>
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="agreePrivacy"
                                        id="agreePrivacy"
                                        checked={form.agreePrivacy}
                                        onChange={(e) => setForm({ ...form, agreePrivacy: e.target.checked })}
                                    />
                                    <label htmlFor="agreePrivacy">[필수] 이용약관 동의</label>
                                </div>
                                <Link href="/contents/termsOfService">상세보기</Link>
                            </li>
                            {/* <li>
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="agreePayment"
                                        id="agreePayment"
                                        checked={form.agreePayment}
                                        onChange={(e) => setForm({ ...form, agreePayment: e.target.checked })}
                                    />
                                    <label htmlFor="agreePayment">[필수] 전자결제대행 이용 동의</label>
                                </div>
                                <a href="">상세보기</a>
                            </li> */}
                            <li>
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        name="is_agree_promotion"
                                        id="is_agree_promotion"
                                        checked={form.is_agree_promotion}
                                        onChange={(e) => setForm({ ...form, is_agree_promotion: e.target.checked })}
                                    />
                                    <label htmlFor="is_agree_promotion">[선택] 광고성 정보 수신 동의</label>
                                </div>
                                <Link href="/contents/privacyPolicy">상세보기</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="px-20">
                        <button onClick={(()=>{store()})} className="btn org">열매나무 회원가입</button>
                    </div>
                </section>
            </div>
        </>
    );
}
