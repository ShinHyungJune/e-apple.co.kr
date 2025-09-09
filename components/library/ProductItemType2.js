import Link from 'next/link';

export default function ProductItemType2({categorie}) {
    if(categorie)
    return (
        <article className="item-type2" role="article">
            <div className="img-wrap">
                <img src={categorie.img?.url} alt={`${categorie.title} 카테고리 이미지`} />
            </div>
            <div className="txt-wrap">
                <h3 className="txt-top">{categorie.title}</h3>
                <p className="txt-bt">
                    {categorie.description}
                </p>
            </div>
        </article>
    );
}
