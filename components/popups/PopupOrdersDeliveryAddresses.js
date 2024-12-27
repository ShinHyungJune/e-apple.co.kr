import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NoListData from "../NoListData";
import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";
import AddressItemType1 from "../library/AddressItemType1";

const PopupOrdersDeliveryAddresses = ({ setForm, isPopup, setIsPopup }) => {
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

    function apply() {
        if (selectedDeliveryAddress) {
            setForm((prevForm) => ({
                ...prevForm,
                delivery_name: selectedDeliveryAddress.name, // 배송지명
                delivery_phone: selectedDeliveryAddress.phone, // 배송지 연락처
                delivery_postal_code: selectedDeliveryAddress.postal_code, // 배송지 우편번호
                delivery_address: selectedDeliveryAddress.address, // 배송지 주소
                delivery_address_detail: selectedDeliveryAddress.address_detail, // 배송지 상세주소
                delivery_request: selectedDeliveryAddress.delivery_request || "" // 배송 요청 사항
            }));
            setIsPopup(false)
        } else {
            alert("적용할 배송지정보가 없습니다.");
            setIsPopup(false)
        }
    }
    

    if (isPopup)
    return (
        <>
            <div className="popup-wrap add-bottomNav">
                <div className="popup-wrap-bg" onClick={() => { setIsPopup(false) }}></div>
                <div className="popup-box-type1">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={() => { setIsPopup(false) }}></button>
                    </div>
                    <div className="popup-content-wrap">
                        <div className="address-list-wrap-type1">
                            {
                                deliveryAddresses.length > 0 ? (
                                    <ul>
                                        {deliveryAddresses
                                            .sort((a, b) => b.is_default - a.is_default) // 기본 배송지를 먼저 정렬
                                            .map((deliveryAddresse) => (
                                                <li key={deliveryAddresse.id}>
                                                    <AddressItemType1
                                                        deliveryAddresse={deliveryAddresse}
                                                        onSuccess={() => index()}
                                                        selectedDeliveryAddress={selectedDeliveryAddress}
                                                        setSelectedDeliveryAddress={setSelectedDeliveryAddress}
                                                        noEdit={true}
                                                    />
                                                </li>
                                            ))}
                                    </ul>
                                ) : (<NoListData message={"등록된 배송지가 없습니다."} />)
                            }
                        </div>
                        <div className="popup-bt-btn-wrap">
                            <button className="popup-bt-btn org" onClick={() => {apply()}}>배송지 적용</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupOrdersDeliveryAddresses;
