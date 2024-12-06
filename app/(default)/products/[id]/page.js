"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import MainTabMenu from "@/components/library/MainTabMenu";
import NoListData from "@/components/NoListData";
import ProductItemType1 from "@/components/library/ProductItemType1";

import productsApi from "@/lib/api/productsApi";

import ProductDescription from "@/components/productsComponents/ProductDescription";
import ProductInformation from "@/components/productsComponents/ProductInformation";
import ProductReview from "@/components/productsComponents/ProductReview";

export default function page(params) {
    const router = useRouter();

    const [product, setProduct] = useState();

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    useEffect(() => {
        productsShow()
    }, [])

    function productsShow() {
        productsApi.show(params.params.id, (response) => {
            setProduct(response.data.data);
        })
    }







    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            const menuItems = document.querySelectorAll(".tab-menu-type2 ul li");
    
            if (sections.length === 0 || menuItems.length === 0) return; // 요소가 없으면 종료
    
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom > 100) {
                    menuItems.forEach(item => item.classList.remove("active"));
                    if (menuItems[index]) {
                        menuItems[index].classList.add("active");
                    }
                }
            });
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // cleanup
    }, []);
    
    
    if (product)
        return (
            <>
                <Header />

                <div className="body">
                    <div className="tab-menu-type2">
                        <ul>
                            <li className="active">
                                <a href="#description">상품설명</a>
                            </li>
                            <li>
                                <a href="#Information">상세정보</a>
                            </li>
                            <li>
                                <a href="#review">후기 999+</a>
                            </li>
                            <li>
                                <a href="#Inquiry">문의 54</a>
                            </li>
                        </ul>
                    </div>

                    <div className="productDetails-buy-btn-wrap">
                        <button className="cart-btn"></button>
                        <button className="productDetails-buy-btn">구매하기</button>
                    </div>
                    
                    {/* 상세설명 */}
                    <ProductDescription product={product}/>
                    
                    {/* 상세정보 */}
                    <ProductInformation product={product}/>

                    {/* 후기 */}
                    <ProductReview product={product}/>

                    {/* 문의 */}
                    <section id="Inquiry" className="pt-30 mb-40">
                        <div className="section-title-wrap-type3 mb-20">
                            <p className="section-title">상품 Q&A</p>
                            <a href="/productInquiryWrite.html" className="link-txt">
                                Q&A쓰기
                            </a>
                        </div>
                        <div className="qna-list-type1">
                            <ul>
                                <li>
                                    <div className="qna-item-type1">
                                        <div className="qna-item-top">
                                            <div className="date-btn-wrap">
                                                <p className="date-txt">2024.00.00</p>
                                                <p className="state-txt">답변완료</p>
                                            </div>
                                            <div className="category-wrap">
                                                <p className="category-txt">[1.5kg (중대과/6입)]</p>
                                            </div>
                                            <div className="content-txt-wrap">
                                                <div className="content-txt">
                                                    출고는 언제해주시는건가요? <br />
                                                    올 생각을 안해요.
                                                </div>
                                                <div className="btn-wrap">
                                                    <button></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qna-item-bt">
                                            <div className="category-wrap">
                                                <p className="category">답변</p>
                                            </div>
                                            <div className="content-txt-wrap">
                                                <p>
                                                    안녕하세요. <br />
                                                    싱그러운 하루를 전달하는 열매나무입니다.
                                                    <br />
                                                    <br />
                                                    주문해주신 과일은 금일 출고 예정입니다.
                                                    <br />
                                                    <br />
                                                    감사합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="qna-item-type1">
                                        <div className="qna-item-top">
                                            <div className="date-btn-wrap">
                                                <p className="date-txt">2024.00.00</p>
                                                <p className="state-txt">답변완료</p>
                                            </div>
                                            <div className="category-wrap">
                                                <p className="category-txt">[1.5kg (중대과/6입)]</p>
                                            </div>
                                            <div className="content-txt-wrap">
                                                <div className="content-txt">
                                                    출고는 언제해주시는건가요? <br />
                                                    올 생각을 안해요.
                                                </div>
                                                <div className="btn-wrap">
                                                    <button></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qna-item-bt">
                                            <div className="category-wrap">
                                                <p className="category">답변</p>
                                            </div>
                                            <div className="content-txt-wrap">
                                                <p>
                                                    안녕하세요. <br />
                                                    싱그러운 하루를 전달하는 열매나무입니다.
                                                    <br />
                                                    <br />
                                                    주문해주신 과일은 금일 출고 예정입니다.
                                                    <br />
                                                    <br />
                                                    감사합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    

                    {/* 상품 구매 */}
                    {/* <div className="popup-wrap popup1">
                        <div className="popup-wrap-bg"></div>
                        <div className="popup-box-type1">
                            <div className="popup-close-btn-wrap">
                                <button className="popup-close-btn"></button>
                            </div>

                            <div className="popup-content-wrap">
                                <div className="mb-20">
                                    <select name="" id="" className="select-box-type1">
                                        <option value="">선택해주세요.</option>
                                        <option value="">중량선택</option>
                                    </select>
                                </div>

                                <div className="saved-items-list-type1">
                                    <ul>
                                        <li>
                                            <div className="saved-item-type1">
                                                <div className="saved-item-name">
                                                    <p className="option">2kg(5-6 대과)</p>
                                                    <p className="price">29,900원</p>
                                                </div>
                                                <div className="quantity-selector">
                                                    <button>
                                                        <i className="xi-minus"></i>
                                                    </button>
                                                    <input type="number" value="1" readOnly />
                                                    <button>
                                                        <i className="xi-plus"></i>
                                                    </button>
                                                </div>
                                                <button className="delete-btn">
                                                    <i className="xi-close"></i>
                                                </button>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="saved-item-type1">
                                                <div className="saved-item-name">
                                                    <p className="option">2kg(5-6 대과)</p>
                                                    <p className="price">29,900원</p>
                                                </div>
                                                <div className="quantity-selector">
                                                    <button>
                                                        <i className="xi-minus"></i>
                                                    </button>
                                                    <input type="number" value="1" readOnly />
                                                    <button>
                                                        <i className="xi-plus"></i>
                                                    </button>
                                                </div>
                                                <button className="delete-btn">
                                                    <i className="xi-close"></i>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="price-information-list mb-20">
                                    <ul>
                                        <li>
                                            <div className="price-information">
                                                <p className="label">총 상품 금액</p>
                                                <p className="price">45,000원</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="price-information">
                                                <p className="label">상품금액</p>
                                                <p className="price minus">-4,830원</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="price-information final">
                                        <p className="label">총 상품금액</p>
                                        <p className="price">30,170원</p>
                                    </div>
                                </div>

                                <div className="popup-bt-btn-wrap">
                                    <button className="popup-bt-btn wht">장바구니</button>
                                    <button className="popup-bt-btn org">바로구매</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </>
        );
}
