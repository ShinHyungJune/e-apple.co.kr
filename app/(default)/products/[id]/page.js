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
import ProductInquiry from "@/components/productsComponents/ProductInquiry";
import PopupOrder from "@/components/popups/PopupOrder";

import ToastAlert from "@/components/ToastAlert";

export default function page(params) {
    const router = useRouter();

    const [product, setProduct] = useState();

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    // 구매팝업 열고닫기
    const [isPopupOrder, setIsPopupOrder] = useState(false)

    const [showToast, setShowToast] = useState(false);



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

            if (sections.length == 0 || menuItems.length == 0) return; // 요소가 없으면 종료

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
                                <a href="#review">후기</a>
                            </li>
                            <li>
                                <a href="#Inquiry">문의</a>
                            </li>
                        </ul>
                    </div>

                    <div className="productDetails-buy-btn-wrap">
                        <button className="cart-btn" onClick={() => { setIsPopupOrder(true) }}></button>
                        <button className="productDetails-buy-btn" onClick={() => { setIsPopupOrder(true) }}>구매하기</button>
                    </div>

                    {/* 상세설명 */}
                    <ProductDescription product={product} />

                    {/* 상세정보 */}
                    <ProductInformation product={product} />

                    {/* 후기 */}
                    <ProductReview product={product} />

                    {/* 문의 */}
                    <ProductInquiry product={product} />

                    {/* 상품 구매 */}
                    {isPopupOrder ? <PopupOrder product={product} setIsPopupOrder={setIsPopupOrder} onSuccess={() => {setShowToast(true);}} /> : null}

                    {/* 장바구니 추가 */}
                    {showToast && (
                        <ToastAlert
                            message="장바구니 담기 완료"
                            navigateText="장바구니로 이동" // 문구 동적으로 설정
                            onNavigate={()=>{router.push("/mypage/carts")}} // 버튼 클릭 시 호출
                            duration={3000}
                            onClose={() => setShowToast(false)} // 알림 닫힌 후 상태 초기화
                        />
                    )}
                </div>
            </>
        );
}
