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

import AddressItemType1 from "@/components/library/AddressItemType1";

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
        index()
    }, [form])
    function index() {
        deliveryAddressesApi.index(form, (response) => {
            setDeliveryAddresses(response.data);
            console.log(response.data);
        })
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
                                        deliveryAddresses.data.map((deliveryAddresse) => {
                                            return (
                                                <li key={deliveryAddresse.id}>
                                                    <AddressItemType1 deliveryAddresse={deliveryAddresse} onSuccess={()=>{index()}}/>
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
