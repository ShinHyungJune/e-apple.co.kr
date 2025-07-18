import Link from 'next/link';
import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";
import { useRouter } from "next/navigation";

export default function AddressItemType1({ 
        deliveryAddresse, 
        onSuccess, 
        selectedDeliveryAddress, 
        setSelectedDeliveryAddress, 
        noEdit=false,
        onEdit,
    }) {
     const router = useRouter();

    const destroy = (id) => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            deliveryAddressesApi.destroy(id, {}, (response) => {
                onSuccess()
                alert("삭제되었습니다.");
            });
        }
    };


    if (deliveryAddresse)
        return (
            <div 
                className={`address-item-type1 hover ${selectedDeliveryAddress?.id == deliveryAddresse.id ? "active" : null}`}
                onClick={()=>{setSelectedDeliveryAddress(deliveryAddresse)}}
            >
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
                        {
                            !noEdit ?
                                <a href={""} onClick={(e) => {
                                    e.preventDefault();
                                    if (onEdit) {
                                        onEdit(deliveryAddresse);
                                    } else {
                                        router.push(`/mypage/deliveryAddresses/create?id=${deliveryAddresse.id}`);
                                    }
                                }} className="add-option-btn"
                                >
                                    수정하기
                                </a>
                                :
                                null
                        }
                        
                    </div>

                </div>
                <div className="address-wrap">
                    <p className="address">
                        {deliveryAddresse.address + " " + deliveryAddresse.address_detail}
                    </p>
                </div>
                <div className="user-name-num-wrap">
                    <p className="user-name">{deliveryAddresse.recipient_name}</p>
                    <p className="user-num">{deliveryAddresse.phone}</p>
                </div>
            </div>
        );
}
