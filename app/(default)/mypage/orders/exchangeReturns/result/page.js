"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import Header from "@/components/Header";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const merchant_uid = searchParams.get('merchant_uid');
    const buyer_name = searchParams.get('buyer_name');
    const updated_at = searchParams.get('updated_at');
    const type = searchParams.get('type');

    return (
        <>
            <Header subTitle={'교환/반품'} />
            <div className="body">
                <div className="btn-wrap-fixed">
                    <button className="btn wht">요청내역상세</button>
                    <Link href={"/mypage/orders"} className="btn org">닫기</Link>
                </div>
                <section>
                    <div className="success-box-type1">
                        <div className="success-box-title-wrap">
                            <i className="xi-check-circle"></i>
                            <p className="success-box-title">
                                <span>{type == "return" ? "반품" : "교환"}요청이 완료</span>되었습니다.
                            </p>
                        </div>

                        <div className="order-number-wrap mt-30">
                            <p className="date">요청일 {updated_at}</p>
                            <p className="order-number">주문번호 {merchant_uid}</p>
                        </div>

                        <div className="success-box-txt-wrap mt-30">
                            <p className="success-box-txt">
                                {type == "return" ? "반품" : "교환"} 요청이 접수되었습니다. <br />
                                내용 확인 후 5영업일 이내로 <br />
                                등록된 회원님의 연락처로 연락드리겠습니다. <br />
                                감사합니다.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}