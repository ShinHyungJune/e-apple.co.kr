"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
import { actions } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";


export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <>
            <Header />
            <div className="body">
                <div className="btn-wrap-fixed">
                    <Link href="/login" className="btn org">
                        로그인
                    </Link>
                </div>

                <section>
                    {/* 성공 메시지 */}
                    <div className="success-box-type1">
                        <div className="success-box-title-wrap">
                            <i className="xi-check-circle"></i>
                            <p className="success-box-title">
                                <span>비밀번호</span>가 변경되었습니다.
                            </p>
                        </div>
                        <div className="success-box-txt-wrap mt-10">
                            <p className="success-box-txt">
                                새로운 비밀번호로 로그인해주세요.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
