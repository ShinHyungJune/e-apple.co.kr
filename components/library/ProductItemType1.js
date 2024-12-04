import Link from 'next/link';

export default function ProductItemType1({product}) {
    if (product)
    return (
        <div className="item-type1">
            <div className="item-img-wrap">
                <Link href="/productDetails.html" className="img">
                    <img src={product.product_images[0].original_url} alt={product.file_name} />
                </Link>
                {product.is_new ?
                    <div className="new">
                        NEW
                    </div>
                    : null}
                <button className="cart-btn"></button>
            </div>
            <div className="item-content-wrap">
                <Link href="/productDetails.html" className="item-name">
                    {product.name}
                </Link>
                <div className="price-wrap">
                    <p className="discounted-price">{product.price.toLocaleString()}원</p>
                    <p className="original-price">{product.original_price.toLocaleString()}원</p>
                </div>
                <div className="sub-content">
                    <p><i className="xi-star-o"></i>{ product.average_rating ? parseFloat(product.average_rating).toFixed(1) :"0"}</p>
                    <p><i className="xi-eye-o"></i>{product.view_count}</p>
                </div>
            </div>
        </div>
    );
}
