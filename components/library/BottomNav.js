import React from "react";

const BottomNav = () => {
    return (
        <div className="bottomNav-type1">
            <ul>
                <li>
                    <a href="/" className="bottomNav-button">
                        <img src="/images/bottomNav-home.png" alt="홈" />
                    </a>
                </li>
                <li>
                    <a href="" className="bottomNav-button">
                        <img src="/images/bottomNav-list.png" alt="목록" />
                    </a>
                </li>
                <li>
                    <a href="/bast.html" className="bottomNav-button">
                        <img src="/images/bottomNav-best.png" alt="베스트" />
                    </a>
                </li>
                <li>
                    <a href="/event.html" className="bottomNav-button">
                        <img src="/images/bottomNav-event.png" alt="이벤트" />
                    </a>
                </li>
                <li>
                    <a href="/mypage.html" className="bottomNav-button">
                        <img src="/images/bottomNav-my.png" alt="마이페이지" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default BottomNav;