import React, { useState } from 'react';
import Link from 'next/link';

export default function Header({ subTitle }) {
    const [showTopBanner, setShowTopBanner] = useState(true); // topBanner의 가시성 관리

    return (
        <div className="header-type1">
            {showTopBanner && ( // showTopBanner가 true일 때만 렌더링
                <div className="topBanner">
                    <Link href="/">
                        회원가입하고 열매나무의 신선한 상품을 할인받아보세요!
                    </Link>
                    <button onClick={() => setShowTopBanner(false)}>
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
                    </div>
                    :
                    <div className="header-box">
                        <Link href="/" className="logo">
                            LOGO
                        </Link>
                        
                        <div className="header-btn-wrap">
                            <div className='search-bar'>
                                <input type="text" name="" id="" />
                            </div>
                            <button className="header-btn search-open-btn">
                                <i className="xi-search"></i>
                            </button>
                            <Link href="/cart" className="header-btn">
                                <i className="xi-cart-o"></i>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
}
