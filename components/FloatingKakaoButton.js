import React from 'react';

const FloatingKakaoButton = () => {
    const handleClick = () => {
        window.open('https://pf.kakao.com/_xiQLFn', '_blank');
    };

    return (
        <div className="floating-kakao-button" onClick={handleClick}>
            <img src="/images/sns-kakao.png" alt="카카오채널" />
        </div>
    );
};

export default FloatingKakaoButton;