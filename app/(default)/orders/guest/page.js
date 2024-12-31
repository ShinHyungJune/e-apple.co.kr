"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import Header from "@/components/Header";
import ordersApi from "@/lib/api/ordersApi";
import Error from "@/components/Error";

export default function Page() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        buyer_name: "",
        merchant_uid: "",
    });

    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    function show() {
        ordersApi.show("guest", form, (response) => {
            let data = response.data.data;
            router.push(`/mypage/orders/guest?buyer_name=${data.buyer_name}&merchant_uid=${data.merchant_uid}`)
        },(error)=>{
            dispatch(actions.setMessage("주문내역이 없습니다."));
        })
    }


    return (
        <>
            <Header subTitle={"비회원 주문조회"} />
            <div className="body login">
                <section className="mt-30">
                    <div className="input-list-type2 px-20 mb-60">
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="buyer_name"
                                    placeholder="주문자 성명"
                                    value={form.buyer_name}
                                    onChange={changeForm}
                                />
                            </div>
                            <Error name={'buyer_name'} />
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="merchant_uid"
                                    placeholder="주문번호"
                                    value={form.merchant_uid}
                                    onChange={changeForm}
                                />
                            </div>
                            <Error name={'merchant_uid'} />
                        </div>
                    </div>
                    <div className="input-list-type2 px-20">
                        <div>
                            <button onClick={() => { show() }} className="btn blk">
                                조회하기
                            </button>
                        </div>
                        <div>
                            <Link href={"/users/create"} className="btn bd-blk">
                                열매나무 회원가입
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
