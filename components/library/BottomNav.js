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
            <div className="bottomNav-type1">
                <ul>
                    <li>
                        <a href="/" className="bottomNav-button">
                            <img src="/images/bottomNav-home.png" alt="홈" />
                        </a>
                    </li>
                    <li>
                        <button onClick={()=>{setIsPopupList(true)}} className="bottomNav-button">
                            <img src="/images/bottomNav-list.png" alt="목록" />
                        </button>
                    </li>
                    <li>
                        <a href="/basts" className="bottomNav-button">
                            <img src="/images/bottomNav-best.png" alt="베스트" />
                        </a>
                    </li>
                    <li>
                        <a href="/events" className="bottomNav-button">
                            <img src="/images/bottomNav-event.png" alt="이벤트" />
                        </a>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <a href="/mypage" className="bottomNav-button">
                                <img src="/images/bottomNav-my.png" alt="마이페이지" />
                            </a>
                        </li>
                    ) : (
                        <li>
                            <a href="/login" className="bottomNav-button">
                                <img src="/images/bottomNav-my.png" alt="로그인" />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            {isPopupList &&  <PopupList isPopup={isPopupList} setIsPopup={setIsPopupList}/>}
           
        </>
    );
};

export default BottomNav;