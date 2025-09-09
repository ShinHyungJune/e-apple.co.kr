import React from 'react';

const FloatingKakaoButton = () => {
    const handleClick = () => {
        window.open('https://pf.kakao.com/_xiQLFn', '_blank');
    };

    return (
        <button 
            className="floating-kakao-button" 
            onClick={handleClick}
            aria-label="카카오톡 상담 채널 열기"
            type="button"
        >
            <img src="/images/sns-kakao.png" alt="카카오톡 아이콘" aria-hidden="true" />
            <span className="sr-only">카카오톡 상담</span>
        </button>
    );
};

export default FloatingKakaoButton;