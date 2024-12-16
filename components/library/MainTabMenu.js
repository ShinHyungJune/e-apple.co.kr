import Link from 'next/link';

export default function MainTabMenu({ activeTab }) {
    return (
        <div className="main-tab-menu scroll-hidden">
            <div className="tab-menu-bar">
                <Link href="/" className={`tab-item ${activeTab === '전체' ? 'active' : ''}`}>
                    전체
                </Link>
                <Link href="/suggestion" className={`tab-item ${activeTab === '추천' ? 'active' : ''}`}>
                    추천
                </Link>
                <Link href="/basts" className={`tab-item ${activeTab === '베스트' ? 'active' : ''}`}>
                    베스트
                </Link>
                <Link href="/gift" className={`tab-item ${activeTab === '선물' ? 'active' : ''}`}>
                    선물
                </Link>
                <Link href="/storys" className={`tab-item ${activeTab === '스토리' ? 'active' : ''}`}>
                    스토리
                </Link>
                <Link href="/events" className={`tab-item ${activeTab === '이벤트' ? 'active' : ''}`}>
                    이벤트
                </Link>
            </div>
        </div>
    );
}
