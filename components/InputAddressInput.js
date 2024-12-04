import React from 'react';
import Error from "@/components/Error";

const InputAddressInput = ({ form, setForm, addressType }) => {
    // 다음 주소찾기 API 호출
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                const extraAddress = [data.bname, data.buildingName].filter(Boolean).join(', ');
                const fullAddress = `${data.address}${extraAddress ? ` (${extraAddress})` : ''}`;

                const addressFieldZipcode = addressType ? `${addressType}_address_zipcode` : "address_zipcode";
                const addressField = addressType ? `${addressType}_address` : "address";
                const addressDetailField = addressType ? `${addressType}_address_detail` : "address_detail";

                setForm((prevForm) => ({
                    ...prevForm,
                    [addressFieldZipcode]: data.zonecode, // 우편번호
                    [addressField]: fullAddress,           // 주소
                }));
            },
        }).open();
    };

    const addressFieldZipcode = addressType ? `${addressType}_address_zipcode` : "address_zipcode";
    const addressField = addressType ? `${addressType}_address` : "address";
    const addressDetailField = addressType ? `${addressType}_address_detail` : "address_detail";

    return (
        <div>
            <div className="flex flex-vc">
                <div className="input-box readonly col-12 mx560 flex-lg-1">
                    <input
                        type="text"
                        name={addressFieldZipcode}
                        value={form[addressFieldZipcode] || ''}
                        onChange={(e) => {}}
                        placeholder="우편번호"
                        readOnly
                    />
                </div>
                <div className="button-box ml8 w120 w-lg-80">
                    <a
                        href="#"
                        className="btn btn-bd-black h40 flex-1 px0"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddressSearch();
                        }}
                    >
                        주소 찾기
                    </a>
                </div>
            </div>
            <Error name={addressFieldZipcode} />
            <div className="input-box readonly mx560 mt5">
                <input
                    type="text"
                    name={addressField}
                    value={form[addressField] || ''}
                    onChange={(e) => {}}
                    placeholder="주소"
                    readOnly
                />
            </div>
            <Error name={addressField} />
            <div className="input-box mx560 mt5">
                <input
                    type="text"
                    name={addressDetailField}
                    value={form[addressDetailField] || ''}
                    onChange={(e) => setForm({ ...form, [addressDetailField]: e.target.value })}
                    placeholder="상세주소"
                />
            </div>
            <Error name={addressDetailField} />
        </div>
    );
};

export default InputAddressInput;