import Link from 'next/link';

export default function ProductItemType3({product}) {
    if (product)
    return (
        <article className="item-type3" role="article">
            <div className="item-img-wrap">
                <Link href={`/products/${product.id}`} className="img" aria-label={`${product.name} 상품 상세 페이지로 이동`}>
                    <img src={product.img?.url} alt={`${product.name} 상품 이미지`} />
                </Link>
            </div>
            <div className="item-content-wrap">
                <Link href={`/products/${product.id}`} className="item-name" aria-label={`${product.name} 상품 상세 보기`}>
                    {product.name}
                </Link>
                <div className="price-wrap">
                    <p className="discounted-price" aria-label={`할인가 ${product.price?.toLocaleString()}원`}>
                        {product.price?.toLocaleString()}원
                    </p>
                    <p className="original-price" aria-label={`원가 ${product.original_price?.toLocaleString()}원`}>
                        {product.original_price?.toLocaleString()}원
                    </p>
                </div>
                <div className="sub-content">
                    <p aria-label={`평점 ${product.average_rating ? parseFloat(product.average_rating).toFixed(1) : "0"}점`}>
                        <i className="xi-star-o" aria-hidden="true"></i>
                        {product.average_rating ? parseFloat(product.average_rating).toFixed(1) :"0"}
                    </p>
                    <p aria-label={`조회수 ${product.view_count}회`}>
                        <i className="xi-eye-o" aria-hidden="true"></i>
                        {product.view_count}
                    </p>
                </div>
            </div>
        </article>
    );
}
