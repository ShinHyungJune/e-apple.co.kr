import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import NoListData from "@/components/NoListData";
import AddressInput from "@/components/AddressInput";

import deliveryAddressesApi from "@/lib/api/deliveryAddressesApi";

const ModalDeliveryCreate = ({ modal= false, deliveryId, onSuccess = () =>{}, onClose = () => {} }) => {
    const router = useRouter();
    useEffect(() => {
        if (deliveryId) {
            show(); 
        }
    }, []);

    const [form, setForm] = useState({
        recipient_name: "",
        name: "",
        phone: "",
        postal_code: "",
        address: "",
        address_detail: "",
        delivery_request: "",
        is_default: false,
    });


    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const show = () => {
        // API 요청
        deliveryAddressesApi.show(deliveryId, (response) => {
            setForm({
                ...form,
                ...response.data.data,
            });
        });
    };


    const store = () => {
        if (deliveryId) {
            deliveryAddressesApi.update(deliveryId, form, (response) => {
                if (modal) {
                    onSuccess()
                    onClose()
                }else{
                    router.back();
                }
            });
        }else{
            deliveryAddressesApi.store(form, (response) => {
                if (modal) {
                    onSuccess()
                    onClose()
                }else{
                    router.back();
                }
            });
        }
    };
    

    return (
        <>
            <div className={`body ${modal ? "modal-body" : ""}`}>
                {/* 새 배송지 등록 버튼 */}
                <div className="btn-wrap-fixed">
                    <button className="btn org" onClick={()=>{store()}}>
                        {
                            deliveryId ?
                            "배송지 수정"
                            :"새 배송지 등록"
                        }
                    </button>
                </div>
                {
                    modal ?
                        <button className="modal-body-close-btn"
                            onClick={()=>{onClose()}}
                        ><i className="xi-close"></i></button>
                    :""
                }
                

                <section>
                    <div className="input-list-type2 pt-20 pb-20 px-20">
                      

                        {/* 배송지 제목 */}
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">배송지</p>
                        </div>
                        {/* 수취인 이름 */}
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="recipient_name"
                                    value={form.recipient_name || ""}
                                    onChange={changeForm}
                                    placeholder="수취인 이름을 입력해주세요."
                                />
                            </div>
                            <Error name={'recipient_name'} />
                        </div>

                        {/* 배송지명 입력 */}
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name || ""}
                                    onChange={changeForm}
                                    placeholder="배송지명을 입력해주세요."
                                />
                            </div>
                            <Error name={'name'} />
                        </div>

                        {/* 휴대폰번호 입력 */}
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="number"
                                    name="phone"
                                    value={form.phone || ""}
                                    onChange={changeForm}
                                    placeholder="휴대폰번호를 입력해주세요. (“-“제외)"
                                />
                            </div>
                            <Error name={'phone'} />
                        </div>

                        {/* 주소 입력 */}
                        <div className="address-input-wrap-type1">
                            <AddressInput form={form} setForm={setForm} />
                        </div>

                        {/* 배송 시 요청사항 */}
                        <div>
                            <div className="select-box-type1">
                                <select
                                    name="delivery_request"
                                    value={form.delivery_request || ""}
                                    onChange={changeForm}
                                >
                                    <option value="">배송시 요청사항을 선택해주세요.</option>
                                    <option value="빠른배송 부탁드립니다.">빠른배송 부탁드립니다.</option>
                                    <option value="현관에 두고 연락주세요.">현관에 두고 연락주세요.</option>
                                </select>
                                <i className="xi-angle-down"></i>
                            </div>
                        </div>

                        {/* 기본 배송지 설정 */}
                        <div>
                            <div className="checkbox-list-type1">
                                <div className="checkbox-type1">
                                    <input
                                        type="checkbox"
                                        id="checkbox-01"
                                        name="is_default"
                                        checked={form.is_default || false}
                                        onChange={changeForm}
                                    />
                                    <label htmlFor="checkbox-01">기본배송지 설정</label>
                                </div>
                            </div>
                            <Error name={'is_default'} />
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};
export default ModalDeliveryCreate;
