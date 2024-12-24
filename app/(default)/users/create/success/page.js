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
                    <div className="success-box-type1">
                        <div className="success-box-title-wrap">
                            <i className="xi-check-circle"></i>
                            <p className="success-box-title">
                                <span>회원가입</span>이 완료되었습니다. <br />
                                감사합니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
