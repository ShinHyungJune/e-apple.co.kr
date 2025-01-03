"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
import { actions } from "@/app/store";
// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";

import passwordsApi from "@/lib/api/passwordsApi";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    function onChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function update() {
        return passwordsApi.update(form, (response) => {
            alert("비밀번호가 변경되었습니다.")
            router.push("/mypage/users")
        });
    }


    return (
        <>
            <Header subTitle={"비밀번호 변경"} />
            <div className="body">
                {
                    isClient &&
                    <>
                        {/* 비밀번호 변경 버튼 */}
                        <div className="btn-wrap-fixed">
                            <button className="btn org" onClick={() => { update() }}>비밀번호 변경</button>
                        </div>

                        <section>
                            {/* 비밀번호 입력 폼 */}
                            <div className="input-list-type2 pt-20 pb-20 px-20">
                                <div className="input-list-title-wrap">
                                    <p className="input-list-title">새로운 비밀번호를 입력해주세요.</p>
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="password"
                                            name="current_password"
                                            placeholder="기존 비밀번호"
                                            aria-label="기존 비밀번호"
                                            value={form.current_password}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <Error name={'current_password'} />
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="새 비밀번호 (영문+숫자+특수문자 조합의 비밀번호 8자 이상)"
                                            aria-label="새 비밀번호"
                                            value={form.password}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <Error name={'password'} />
                                </div>
                                <div>
                                    <div className="input-txt-box-type1">
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            placeholder="비밀번호 재확인"
                                            aria-label="비밀번호 재확인"
                                            value={form.password_confirmation}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <Error name={'password_confirmation'} />
                                </div>
                            </div>
                        </section>
                    </>
                }

            </div>
        </>
    );
}
