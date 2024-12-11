import React, { useState, useEffect, useMemo } from "react";


const PopupOrder = ({ product, setIsPopupOrder, onSuccess }) => {

    const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션 저장
    const [selectedValue, setSelectedValue] = useState(""); // 셀렉트박스의 현재 값 관리

    const handleOptionChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const selectedOption = product.options.find((option) => option.id === value);
    
        if (!selectedOption) return;
    
        // 중복 체크
        const isAlreadySelected = selectedOptions.some(
            (option) => option.id === selectedOption.id
        );
    
        if (isAlreadySelected) {
            alert("이미 선택된 옵션입니다."); // 중복 시 알림
        } else {
            // count 키를 추가한 새로운 객체 생성
            const optionWithCount = { ...selectedOption, count: 1 };
    
            setSelectedOptions((prevOptions) => [...prevOptions, optionWithCount]); // 새 옵션 추가
        }
    
        // 선택 완료 후 셀렉트박스 초기화
        setSelectedValue("");
    };
    const handleQuantityChange = (id, type) => {
        setSelectedOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.id === id
                    ? {
                          ...option,
                          count: type === "increment" ? option.count + 1 : Math.max(1, option.count - 1),
                      }
                    : option
            )
        );
    };
    const handleDeleteOption = (id) => {
        setSelectedOptions((prevOptions) =>
            prevOptions.filter((option) => option.id !== id)
        );
    };

    // 쿠폰사용전 상품들 총 가격
    const totalPrice = useMemo(() => {
        return selectedOptions.reduce(
            (acc, option) =>
                acc + (product.price + option.price) * option.count,
            0
        );
    }, [selectedOptions, product.price]);
    
    console.log(totalPrice);

    return (
        <>
            <div className="popup-wrap">
                <div className="popup-wrap-bg" onClick={() => { setIsPopupOrder(false) }}></div>
                <div className="popup-box-type1">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={() => { setIsPopupOrder(false) }}></button>
                    </div>

                    <div className="popup-content-wrap">
                        <div className="mb-20">
                            <div className="select-box-type1">
                                <select
                                    name="productOptions"
                                    id="productOptions"
                                    value={selectedValue} // 현재 선택된 값을 관리
                                    onChange={(e) => {
                                        setSelectedValue(e.target.value); // 선택된 값 업데이트
                                        handleOptionChange(e); // 옵션 선택 처리
                                    }}
                                >
                                    <option value="">선택해주세요.</option>
                                    {product.options.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} - {option.price}원
                                        </option>
                                    ))}
                                </select>
                                <i className="xi-angle-down"></i>
                            </div>
                        </div>

                        <div className="saved-items-list-type1">
                            <ul>
                                {selectedOptions.map((option) => (
                                    <li key={option.id}>
                                        <div className="saved-item-type1">
                                            <div className="saved-item-name">
                                                <p className="option">{option.name}</p>
                                                <p className="price">{((product.price + option.price) * option.count).toLocaleString()}원</p>
                                            </div>
                                            <div className="quantity-selector">
                                                <button onClick={() => handleQuantityChange(option.id, "decrement")}>
                                                    <i className="xi-minus"></i>
                                                </button>
                                                <input type="number" value={option.count} readOnly />
                                                <button onClick={() => handleQuantityChange(option.id, "increment")}>
                                                    <i className="xi-plus"></i>
                                                </button>
                                            </div>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteOption(option.id)}
                                            >
                                                <i className="xi-close"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="price-information-list mb-20">
                            <ul>
                                <li>
                                    <div className="price-information">
                                        <p className="label">총 상품 금액</p>
                                        <p className="price">{totalPrice.toLocaleString()}원</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="price-information">
                                        <p className="label">쿠폰할인</p>
                                        <p className="price minus underline">할인 쿠폰 받고 가격을 확인해보세요.</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="price-information final">
                                <p className="label">총 상품금액</p>
                                <p className="price">{totalPrice.toLocaleString()}원</p>
                            </div>
                        </div>

                        <div className="popup-bt-btn-wrap">
                            <button className="popup-bt-btn wht" onClick={()=>{
                                setIsPopupOrder(false)
                                onSuccess()
                            }}>장바구니</button>
                            <button className="popup-bt-btn org">바로구매</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupOrder;
