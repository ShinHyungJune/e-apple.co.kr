import React, { useState, useEffect } from "react";

const ProductInformation = ({ product }) => {
    return (
        <>
            <section id="Information">
                <div className="product-Information-list">
                    <ul className="bd-bt">
                        <li>
                            <p className="label">상품명</p>
                            <p className="content">{product.name}</p>
                        </li>
                        <li>
                            <p className="label">식품의 유형</p>
                            <p className="content">{product.food_type}</p>
                        </li>
                        <li>
                            <p className="label">과일 크기</p>
                            <p className="content">{product.fruit_size}</p>
                        </li>
                        <li>
                            <p className="label">당도</p>
                            <p className="content">{product.sugar_content}</p>
                        </li>
                        <li>
                            <p className="label">생산자 및 소재지</p>
                            <p className="content">{product.manufacturer_and_location}</p>
                        </li>
                        <li>
                            <p className="label">수입자</p>
                            <p className="content">{product.importer}</p>
                        </li>
                        <li>
                            <p className="label">원산지</p>
                            <p className="content">{product.origin}</p>
                        </li>
                        <li>
                            <p className="label">원재료 및 함량</p>
                            <p className="content">{product.ingredients_and_composition}</p>
                        </li>
                        <li>
                            <p className="label">보관/취급방법</p>
                            <p className="content">{product.storage_and_handling}</p>
                        </li>
                        <li>
                            <p className="label">제조연월일/유통기한</p>
                            <p className="content">
                                {product.manufacture_date + " " + product.expiration_date}
                            </p>
                        </li>
                        <li>
                            <p className="label">유전자변형 농산물여부</p>
                            <p className="content">{product.gmo_desc}</p>
                        </li>
                        <li>
                            <p className="label">소비자상담문의</p>
                            <p className="content">{product.customer_service_contact}</p>
                        </li>
                    </ul>
                    <ul className="bd-bt">
                        <li>
                            <p className="label">카카오톡 상담</p>
                            <p className="content">@열매나무</p>
                        </li>
                        <li>
                            <p className="label">전화 상담</p>
                            <p className="content">000-0000-0000</p>
                        </li>
                        <li>
                            <p className="label">상담 시간</p>
                            <p className="content">
                                상담 시간: 09:00 ~ 18:00<br />
                                점심 시간: 12:00 ~ 13:00<br />
                                주말 및 공휴일은 휴무입니다.
                            </p>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="label">반품 배송지</p>
                            <p className="content">
                                [12774] 서울특별시 가나구 다라로 123-4번지 108호
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </>

    );
};

export default ProductInformation;
