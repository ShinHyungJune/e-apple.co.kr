import Link from 'next/link';

export default function ProductCategorys({ categorys }) {
    return (
        <div className="main-tab-menu scroll-hidden">
            <div className="tab-menu-bar">
                <button className={`tab-item`}>
                    전체
                </button>
                <button className={`tab-item`}>
                    추천
                </button>
                <button className={`tab-item`}>
                    베스트
                </button>
                <button className={`tab-item`}>
                    선물
                </button>
                <button className={`tab-item`}>
                    스토리
                </button>
                <button className={`tab-item`}>
                    이벤트
                </button>
            </div>
        </div>
    );
}
