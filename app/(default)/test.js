"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import axios from "axios";


export default function Page() {
    useEffect(() => {
        axios.post('https://api-janginart.honest-family.com/api/verifyNumbers', {
            contact:"01030217486"
        });
    }, []);
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <section>
            <div className="container sm">
                <div className="mypage-box">
                    <div className="mypage-right">
                        <div className="title-box mb16">
                            <h2 className="lg tc">회원가입이 완료되었습니다.</h2>
                        </div>
                        <div className="result-box mt24">
                            <div>
                                <p>신규 회원께 마일리지 1000P를 지급해드렸습니다.</p>
                            </div>
                        </div>
                        <div className="button-box mt64 mt-lg-32">
                            <Link href="/" className="btn btn-black lg radius">
                                홈으로
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
