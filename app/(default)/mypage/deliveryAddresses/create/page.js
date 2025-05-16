"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import AddressInput from "@/components/AddressInput";

import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";
import ModalDeliveryCreate from "@/components/popups/ModalDeliveryCreate";

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    


    


    return (
        <>
            <Header subTitle={'새 배송지'}/>

            <ModalDeliveryCreate 
                modal={false}
                deliveryId={id}
            />
        </>
    );
}
