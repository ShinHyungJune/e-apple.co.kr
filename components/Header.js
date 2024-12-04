import Link from 'next/link';

export default function Header() {
    return (
        <div className="header-type1">
            <div className="topBanner">
                <Link href="/">
                    회원가입하고 열매나무의 신선한 상품을 할인받아보세요!
                </Link>
                <button>
                    <i className="xi-close"></i>
                </button>
            </div>
            <div className="header-box">
                <Link href="/" className="logo">
                    LOGO
                </Link>

                <div className="header-btn-wrap">
                    <button className="header-btn search-btn">
                        <i className="xi-search"></i>
                    </button>
                    <Link href="/cart.html" className="header-btn">
                        <i className="xi-cart-o"></i>
                    </Link>
                    {/* Uncomment the following line if needed */}
                    {/* 
                    <Link href="/cart.html" className="header-btn">
                        <i className="xi-user-o"></i>
                    </Link>
                    */}
                </div>
            </div>
        </div>
    );
}
