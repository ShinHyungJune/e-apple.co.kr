import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import PopupList from "@/components/popups/PopupList";

const BottomNav = () => {

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);

    const token = useSelector(state => state.app.token);

    // 서버와 클라이언트의 불일치를 방지하기 위해 초기 상태를 설정
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const [isPopupList, setIsPopupList] = useState(false)

    return (
        <>
            <nav className="bottomNav-type1" role="navigation" aria-label="주요 네비게이션">
                <ul role="menubar">
                    <li role="none">
                        <a href="/" className="bottomNav-button" role="menuitem" aria-label="홈페이지로 이동">
                            <img src="/images/bottomNav-home.png" alt="홈 아이콘" aria-hidden="true" />
                            <p>홈</p>
                        </a>
                    </li>
                    <li role="none">
                        <button 
                            onClick={()=>{setIsPopupList(!isPopupList)}} 
                            className="bottomNav-button" 
                            role="menuitem" 
                            aria-label="카테고리 목록 보기"
                            aria-expanded={isPopupList}
                            aria-haspopup="true"
                        >
                            <img src="/images/bottomNav-list.png" alt="목록 아이콘" aria-hidden="true" />
                            <p>리스트</p>
                        </button>
                    </li>
                    <li role="none">
                        <a href="/basts" className="bottomNav-button" role="menuitem" aria-label="베스트 상품 페이지로 이동">
                            <img src="/images/bottomNav-best.png" alt="베스트 아이콘" aria-hidden="true" />
                            <p>베스트</p>
                        </a>
                    </li>
                    <li role="none">
                        <a href="/events" className="bottomNav-button" role="menuitem" aria-label="이벤트 페이지로 이동">
                            <img src="/images/bottomNav-event.png" alt="이벤트 아이콘" aria-hidden="true" />
                            <p>이벤트</p>
                        </a>
                    </li>
                    {isLoggedIn ? (
                        <li role="none">
                            <a href="/mypage" className="bottomNav-button" role="menuitem" aria-label="마이페이지로 이동">
                                <img src="/images/bottomNav-my.png" alt="마이페이지 아이콘" aria-hidden="true" />
                                <p>마이</p>
                            </a>
                        </li>
                    ) : (
                        <li role="none">
                            <a href="/login" className="bottomNav-button" role="menuitem" aria-label="로그인 페이지로 이동">
                                <img src="/images/bottomNav-my.png" alt="로그인 아이콘" aria-hidden="true" />
                                <p>마이</p>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
            <PopupList isPopup={isPopupList} setIsPopup={setIsPopupList}/>
        </>
    );
};

export default BottomNav;