import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Header({ subTitle }) {
    const router = useRouter();
    const [showTopBanner, setShowTopBanner] = useState(true); // 초기값 설정

    // 컴포넌트가 마운트될 때 localStorage에서 상태를 복원
    useEffect(() => {
        const bannerState = localStorage.getItem('showTopBanner');
        if (bannerState !== null) {
            setShowTopBanner(JSON.parse(bannerState)); // 문자열을 불리언으로 변환
        }
    }, []);

    // 상태 변경 시 localStorage에 저장
    const handleCloseBanner = () => {
        setShowTopBanner(false);
        localStorage.setItem('showTopBanner', JSON.stringify(false)); // 상태를 저장
    };



    return (
        <>
            <div className="header-type1">
                {showTopBanner && ( // showTopBanner가 true일 때만 렌더링
                    <div className="topBanner">
                        <Link href="/">
                            회원가입하고 열매나무의 신선한 상품을 할인받아보세요!
                        </Link>
                        <button onClick={handleCloseBanner}>
                            <i className="xi-close"></i>
                        </button>
                    </div>
                )}
                {
                    subTitle ?
                        <div className='header-box'>
                            <div className="back-btn-wrap">
                                <button onClick={() => window.history.back()}>
                                    <i className="xi-arrow-left"></i>
                                </button>
                            </div>
                            <div className='header-subTitle-wrap'>
                                <p className='header-subTitle'>{subTitle}</p>
                            </div>

                            <div className="header-btn-wrap">
                                <button onClick={()=>{router.push("/products/search")}} className="header-btn search-open-btn">
                                    <i className="xi-search"></i>
                                </button>
                                <Link href="/mypage/carts" className="header-btn">
                                    <i className="xi-cart-o"></i>
                                </Link>
                            </div>
                        </div>
                        :
                        <div className="header-box">
                            <Link href="/" className="logo">
                                <img src="/images/logo.png" alt="" />
                            </Link>

                            <div className="header-btn-wrap">
                                <button onClick={()=>{router.push("/products/search")}} className="header-btn search-open-btn">
                                    <i className="xi-search"></i>
                                </button>
                                <Link href="/mypage/carts" className="header-btn">
                                    <i className="xi-cart-o"></i>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </>
    );
}
