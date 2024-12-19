import Link from 'next/link';

export default function PointsItemType1({point}) {
    if(point)
    return (
        <div className="rewardPoints-item-type1">
            <p className="date mb-10">2024.00.00</p>
            <div className="rewardPoints-item-content-wrap">
                <div className="rewardPoints-item-title-wrap">
                    <p className="title">주문사용</p>
                    <p className="num">Order20240000-000000</p>
                </div>
                <p className="points minus">-1,000P</p>
            </div>
        </div>
    );
}
