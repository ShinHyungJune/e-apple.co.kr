import React from "react";
import Error from "@/components/Error";

const AddressInput = ({ form, setForm, addressType }) => {
    // 다음 주소찾기 API 호출
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                const extraAddress = [data.bname, data.buildingName]
                    .filter(Boolean)
                    .join(", ");
                const fullAddress = `${data.address}${extraAddress ? ` (${extraAddress})` : ""
                    }`;

                const postalCodeField = addressType
                    ? `${addressType}_postal_code`
                    : "postal_code";
                const addressField = addressType ? `${addressType}_address` : "address";
                const addressDetailField = addressType
                    ? `${addressType}_address_detail`
                    : "address_detail";

                setForm((prevForm) => ({
                    ...prevForm,
                    [postalCodeField]: data.zonecode, // 우편번호
                    [addressField]: fullAddress, // 주소
                    [addressDetailField]: "", // 상세주소 초기화
                }));
            },
        }).open();
    };

    const postalCodeField = addressType
        ? `${addressType}_postal_code`
        : "postal_code";
    const addressField = addressType ? `${addressType}_address` : "address";
    const addressDetailField = addressType
        ? `${addressType}_address_detail`
        : "address_detail";

    return (
        <>
            {/* 우편번호 */}
            <div>
                <div className="input-txt-btn-box">
                    <div className="input-txt-box-type1 disabled">
                        <label htmlFor={`${postalCodeField}-input`} className="sr-only">우편번호</label>
                        <input
                            id={`${postalCodeField}-input`}
                            type="text"
                            name={postalCodeField}
                            value={form[postalCodeField] || ""}
                            placeholder="우편번호"
                            readOnly
                            aria-label="우편번호 (주소 검색 후 자동 입력)"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn type2 wht"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddressSearch();
                        }}
                        aria-label="우편번호 검색"
                    >
                        우편번호
                    </button>
                </div>
                <Error name={postalCodeField} />
            </div>

            {/* 주소 */}
            <div>
                <div className="input-txt-box-type1 disabled">
                    <label htmlFor={`${addressField}-input`} className="sr-only">주소</label>
                    <input
                        id={`${addressField}-input`}
                        type="text"
                        name={addressField}
                        value={form[addressField] || ""}
                        placeholder="주소"
                        readOnly
                        aria-label="주소 (주소 검색 후 자동 입력)"
                    />
                </div>
                <Error name={addressField} />
            </div>

            {/* 상세주소 */}
            <div>
                <div className="input-txt-box-type1">
                    <label htmlFor={`${addressDetailField}-input`} className="sr-only">상세주소</label>
                    <input
                        id={`${addressDetailField}-input`}
                        type="text"
                        name={addressDetailField}
                        value={form[addressDetailField] || ""}
                        onChange={(e) =>
                            setForm({ ...form, [addressDetailField]: e.target.value })
                        }
                        placeholder="상세주소를 입력해주세요."
                        aria-label="상세주소 입력"
                    />
                </div>
                <Error name={addressDetailField} />
            </div>
        </>
    );
};

export default AddressInput;
