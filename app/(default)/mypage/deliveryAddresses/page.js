"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";

export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({
        page: 1,
    });
    const [deliveryAddresses, setDeliveryAddresses] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        deliveryAddressesIndex()
    }, [form])
    function deliveryAddressesIndex() {
        deliveryAddressesApi.index(form, (response) => {
            setDeliveryAddresses(response.data);
            console.log(response.data);
        })
    }


    const destroy = (id) => {
        deliveryAddressesApi.destroy(id, {}, (response) => {
            console.log(response)
        });
    }


    return (
        <>
            <Header subTitle={'배송지 관리'}/>

            <div className="body">
                <div className="btn-wrap-fixed">
                    {/* <button className="btn wht">기본 배송지 설정</button> */}
                    <Link href={"/mypage/deliveryAddresses/create"} className="btn org">새 배송지 등록</Link>
                </div>
                <section className="pt-30">
                    <div className="address-list-wrap-type1 px-20">
                        {
                            deliveryAddresses.data.length > 0 ? (
                                <ul>
                                    {
                                        deliveryAddresses.data.map((deliveryAddresse, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className={`address-item-type1 ${deliveryAddresse.is_default == 1 ? "active" : ""}`}>
                                                        <div className="address-name-wrap">
                                                            <p className="address-name">
                                                                {deliveryAddresse.name}
                                                                {
                                                                    deliveryAddresse.is_default == 1 ?
                                                                        <span className="default">기본배송지</span>
                                                                        : null
                                                                }
                                                            </p>
                                                            <div className="btn-wrap">
                                                                <button className="add-option-btn" onClick={() => { destroy(deliveryAddresse.id) }}>삭제</button>
                                                                <Link href={`/mypage/deliveryAddresses/create?id=${deliveryAddresse.id}`} className="add-option-btn">수정하기</Link>
                                                            </div>
                                                        </div>
                                                        <div className="address-wrap">
                                                            <p className="address">
                                                                {deliveryAddresse.address + " " + deliveryAddresse.address_detail}
                                                            </p>
                                                        </div>
                                                        <div className="user-name-num-wrap">
                                                            {/* <p className="user-name">{deliveryAddresse.}</p> */}
                                                            <p className="user-num">{deliveryAddresse.phone}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ) : (<NoListData message={"등록된 배송지가 없습니다."} />)
                        }

                    </div>
                </section>
            </div>
        </>
    );
}
