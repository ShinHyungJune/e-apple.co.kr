import Link from 'next/link';

export default function ProductItemType2({categorie}) {
    if(categorie)
    return (
        <div className="item-type2">
            <div className="img-wrap">
                <img src={categorie.img.url} alt={categorie.title} />
            </div>
            <div className="txt-wrap">
                <p className="txt-top">{categorie.title}</p>
                <p className="txt-bt">
                    {categorie.description}
                </p>
            </div>
        </div>
    );
}
