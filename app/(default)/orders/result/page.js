"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const order_id = searchParams.get('order_id');

    return (
        <>
            <Header />

            <div className="body">
                <div className="btn-wrap-fixed">
                    <Link href={"/"} className="btn wht">
                        계속 쇼핑하기
                    </Link>
                    <Link href={""} className="btn org">
                        주문내역
                    </Link>
                </div>
                <section>
                    <div className="success-box-type1">
                        <div className="success-box-title-wrap">
                            <i className="xi-check-circle"></i>
                            <p className="success-box-title">
                                <span>주문이 완료</span>되었습니다. <br />
                                감사합니다.
                            </p>
                        </div>

                        <div className="order-number-wrap mt-30">
                            <p className="date">주문일 2023-12-12</p>
                            <p className="order-number">주문번호 A123456789</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
