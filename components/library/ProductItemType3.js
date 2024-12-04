import Link from 'next/link';

export default function ProductItemType3() {
    return (
        <div className="item-type3">
            <div className="item-img-wrap">
                <Link href="/" className="img">
                    <img src="/images/test-img.png" alt="" />
                </Link>
            </div>
            <div className="item-content-wrap">
                <Link href="/" className="item-name">
                    국내산 바질, 20g, 스테비아 방울토마토, 1.2kg, 1팩
                </Link>
                <div className="price-wrap">
                    <p className="discounted-price">12,160원</p>
                    <p className="original-price">15,130원</p>
                </div>
                <div className="sub-content">
                    <p>
                        <i className="xi-star-o"></i>4.7
                    </p>
                    <p>
                        <i className="xi-eye-o"></i>4.7
                    </p>
                </div>
            </div>
        </div>
    );
}
