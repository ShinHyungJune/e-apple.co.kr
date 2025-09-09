import { useState, useEffect } from "react";

export default function ToastAlert({
    message,
    navigateText = "", // 기본값 설정
    onNavigate,
    duration = 3000,
    onClose,
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // duration 후 자동으로 사라짐
            if (onClose) onClose(); // 알림 닫힘 시 추가 동작
        }, duration);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [duration, onClose]);

    if (!visible) return null; // 알림이 사라졌을 때 렌더링 안 함

    return (
        <div 
            className="toastAlert-type1" 
            role="alert" 
            aria-live="polite" 
            aria-atomic="true"
        >
            <div className="toastAlert-le">
                <p>
                    <i className="xi-check-circle" aria-hidden="true"></i> {message}
                </p>
            </div>
            <div className="toastAlert-ri">
                <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                        if (onNavigate) onNavigate(); // 클릭 시 외부 동작 실행
                    }}
                    aria-label={navigateText}
                >
                    {navigateText}
                </button>
            </div>
        </div>
    );
}
