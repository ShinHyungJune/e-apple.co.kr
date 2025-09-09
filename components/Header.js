import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';

export default function Header({ subTitle }) {
    const router = useRouter();
    const [showTopBanner, setShowTopBanner] = useState(true); // 초기값 설정

    const token = useSelector(state => state.app.token);

    // 서버와 클라이언트의 불일치를 방지하기 위해 초기 상태를 설정
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

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
                    <div className="topBanner" role="banner" aria-label="프로모션 배너">
                        <Link href="/" aria-label="회원가입 페이지로 이동">
                            회원가입하고 열매나무의 신선한 상품을 할인받아보세요!
                        </Link>
                        <button onClick={handleCloseBanner} aria-label="배너 닫기">
                            <i className="xi-close" aria-hidden="true"></i>
                        </button>
                    </div>
                )}
                {
                    subTitle ?
                        <div className='header-box' role="banner">
                            <div className="back-btn-wrap">
                                <button onClick={() => window.history.back()} aria-label="이전 페이지로 돌아가기">
                                    <i className="xi-arrow-left" aria-hidden="true"></i>
                                </button>
                                <button onClick={()=>{router.push("/")}} aria-label="홈페이지로 이동">
                                    <i className='xi-home-o' aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className='header-subTitle-wrap'>
                                <h1 className='header-subTitle'>{subTitle}</h1>
                            </div>

                            <nav className="header-btn-wrap" aria-label="주요 기능 메뉴">
                                <button onClick={()=>{router.push("/products/search")}} className="header-btn search-open-btn" aria-label="상품 검색">
                                    <i className="xi-search" aria-hidden="true"></i>
                                </button>
                                <Link href="/mypage/carts" className="header-btn" aria-label="장바구니">
                                    <i className="xi-cart-o" aria-hidden="true"></i>
                                </Link>
                                {isLoggedIn ? (
                                     <Link href={"/mypage"} className='header-btn' aria-label="마이페이지">
                                        <i className='xi-user-o' aria-hidden="true"></i>
                                     </Link>
                                ) : (
                                    <Link href={"/login"} className='header-btn' aria-label="로그인">
                                        <i className='xi-log-in' aria-hidden="true"></i>
                                    </Link>
                                )}
                                
                            </nav>
                        </div>
                        :
                        <div className="header-box" role="banner">
                            <Link href="/" className="logo" aria-label="열매나무 홈페이지로 이동">
                                <img src="/images/logo.png" alt="열매나무 로고" />
                            </Link>

                            <nav className="header-btn-wrap" aria-label="주요 기능 메뉴">
                                <button onClick={()=>{router.push("/products/search")}} className="header-btn search-open-btn" aria-label="상품 검색">
                                    <i className="xi-search" aria-hidden="true"></i>
                                </button>
                                <Link href="/mypage/carts" className="header-btn" aria-label="장바구니">
                                    <i className="xi-cart-o" aria-hidden="true"></i>
                                </Link>
                                {isLoggedIn ? (
                                     <Link href={"/mypage"} className='header-btn' aria-label="마이페이지">
                                        <i className='xi-user-o' aria-hidden="true"></i>
                                     </Link>
                                ) : (
                                    <Link href={"/login"} className='header-btn' aria-label="로그인">
                                        <i className='xi-log-in' aria-hidden="true"></i>
                                    </Link>
                                )}
                            </nav>
                        </div>
                }
            </div>
        </>
    );
}
