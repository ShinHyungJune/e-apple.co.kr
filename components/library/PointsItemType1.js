import Link from 'next/link';

export default function PointsItemType1({point}) {
    console.log(point);
    if(point)
    return (
        <div className="rewardPoints-item-type1">
            <p className="date mb-10">{point.created_at}</p>
            <div className="rewardPoints-item-content-wrap mb-10">
                <div className="rewardPoints-item-title-wrap">
                    <p className="title">{point.description}</p>
                    <p className="num">Order20240000-000000</p>
                </div>
                {
                    point.deposit > 0 ?
                    <p className="points">+{point.deposit}P</p>
                    :
                    <p className="points minus">-{point.withdrawal}P</p>
                }
                
            </div>
            <div className="rewardPointInfo-wrap">
                <p className="usageType">리뷰적립</p>
                <p className="expirationDate">{point.expiration_date} 소멸예정</p>
            </div>
        </div>
    );
}
