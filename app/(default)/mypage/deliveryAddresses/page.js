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

    const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState();

    const [deliveryAddresses, setDeliveryAddresses] = useState([]);

    useEffect(() => {
        index()
    }, [])
    function index() {
        deliveryAddressesApi.index({}, (response) => {
            const addresses = response.data.data;
            setDeliveryAddresses(addresses);
    
            // is_default가 1인 항목을 찾아 설정
            const defaultAddress = addresses.find(address => address.is_default === 1);
    
            if (defaultAddress) {
                setSelectedDeliveryAddress(defaultAddress);
            }
        });
    }


    const update = () => {
        if (selectedDeliveryAddress) {
            deliveryAddressesApi.update(selectedDeliveryAddress.id, {
                recipient_name: selectedDeliveryAddress.recipient_name,
                name: selectedDeliveryAddress.name,
                phone: selectedDeliveryAddress.phone,
                postal_code: selectedDeliveryAddress.postal_code,
                address: selectedDeliveryAddress.address,
                address_detail: selectedDeliveryAddress.address_detail,
                delivery_request: selectedDeliveryAddress.delivery_request,
                is_default: true,
            }, (response) => {
                console.log(response);
                index()
            });
        } else {
            alert("기본 배송지로 설정할 배송지를 선택해주세요")
        }
    };



    return (
        <>
            <Header subTitle={'배송지 관리'} />

            <div className="body">
                <div className="btn-wrap-fixed">
                    {
                        deliveryAddresses.length > 0 ? (
                            <button className="btn wht" onClick={() => { update() }}>기본 배송지 설정</button>
                        ) : null
                    }
                    <Link href={"/mypage/deliveryAddresses/create"} className="btn org">새 배송지 등록</Link>
                </div>
                <section className="pt-30">
                    <div className="address-list-wrap-type1 px-20">
                        {
                            deliveryAddresses.length > 0 ? (
                                <ul>
                                    {deliveryAddresses
                                        .sort((a, b) => b.is_default - a.is_default) // 기본 배송지 우선 정렬
                                        .map((deliveryAddresse) => (
                                            <li key={deliveryAddresse.id}>
                                                <AddressItemType1
                                                    deliveryAddresse={deliveryAddresse}
                                                    onSuccess={() => index()}
                                                    selectedDeliveryAddress={selectedDeliveryAddress}
                                                    setSelectedDeliveryAddress={setSelectedDeliveryAddress}
                                                />
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <NoListData message={"등록된 배송지가 없습니다."} />
                            )
                        }
                    </div>
                </section>
            </div>
        </>
    );
}
