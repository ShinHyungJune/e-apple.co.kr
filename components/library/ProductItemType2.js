import Link from 'next/link';

export default function ProductItemType2() {
    return (
        <div className="item-type2">
            <Link href="/" className="img-wrap">
                <img src="/images/test-img.png" alt="" />
            </Link>
            <div className="txt-wrap">
                <p className="txt-top">소화와 체중관리에 좋은 바나나</p>
                <p className="txt-bt">
                    식이섬유가 풍부하게 함유되어 있어 소화와 흡수를 돕는 역할을 합니다. 칼로리는 낮지만 포만감을 주며
                    바나나에 함유된 프리바이오틱스 성분은 장 내 유용한 박테리아의 생장을 촉진시켜 소화 기능을
                    개선시키는데 도움을 줍니다.
                </p>
            </div>
        </div>
    );
}
