"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DeliveryPopup.module.css";

export default function DeliveryPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const STORAGE_KEY = 'deliveryPopupClosed';

    useEffect(() => {
        // 로컬스토리지에서 오늘 하루 보지 않기 설정 확인
        const closedDate = localStorage.getItem(STORAGE_KEY);
        const today = new Date().toDateString();

        // 오늘 닫은 기록이 없으면 팝업 표시
        if (closedDate !== today) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleTodayClose = () => {
        // 오늘 날짜를 저장하고 팝업 닫기
        const today = new Date().toDateString();
        localStorage.setItem(STORAGE_KEY, today);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* 모바일 오버레이 */}
            <div className={styles.mobileOverlay} onClick={handleClose}></div>

            {/* 팝업 */}
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    {/* 이미지 */}
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/delivery.png?v=3"
                            alt="배송휴무안내"
                            width={400}
                            height={600}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </div>

                    {/* 하단 버튼 영역 */}
                    <div className={styles.buttonArea}>
                        <button
                            className={styles.todayCloseBtn}
                            onClick={handleTodayClose}
                        >
                            오늘 하루 그만 보기
                        </button>
                        <button
                            className={styles.closeBtn}
                            onClick={handleClose}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
