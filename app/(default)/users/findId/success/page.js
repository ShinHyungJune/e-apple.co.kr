"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
import { actions } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";


export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <>
            <Header />

            <div className="body">
                {/* 로그인 버튼 */}
                <div className="btn-wrap-fixed">
                    <button className="btn org">로그인</button>
                </div>

                <section>
                    {/* 아이디 찾기 성공 메시지 */}
                    <div className="success-box-type1">
                        <div className="success-box-title-wrap">
                            <i className="xi-check-circle"></i>
                            <p className="success-box-title">
                                찾으시는 아이디는 <br />
                                <span>{email}</span> <br />
                                입니다.
                            </p>
                        </div>

                        <div className="success-box-txt-wrap mt-40">
                            <p className="success-box-txt">비밀번호가 기억나지 않으신가요?</p>
                        </div>

                        <div className="underline-btn-wrap mt-20">
                            <Link href="/users/findPassword" className="underline-btn">
                                비밀번호 재설정하기
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
