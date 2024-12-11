import Link from 'next/link';

export default function ProductItemType2({categorie}) {
    if(categorie)
    return (
        <div className="item-type2">
            <Link href="/" className="img-wrap">
                <img src="/images/test-img.png" alt="" />
            </Link>
            <div className="txt-wrap">
                <p className="txt-top">{categorie.title}</p>
                <p className="txt-bt">
                    {categorie.description}
                </p>
            </div>
        </div>
    );
}
