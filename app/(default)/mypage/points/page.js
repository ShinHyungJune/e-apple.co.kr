"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import PointsItemType1 from "@/components/library/PointsItemType1";

import pointsApi from "@/lib/api/pointsApi";


export default function page() {
    const router = useRouter();


    const [form, setForm] = useState({});
    const [points, setPoints] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    useEffect(() => {
        index()
    }, [form])
    function index() {
        pointsApi.index(form, (response) => {
            setPoints(response.data);
            console.log(response.data);
        })
    }



    return (
        <>
            <Header subTitle={'적립금'} />

            <div className="body">
                <section>
                    <div className="mileageBalance-wrap px-20">
                        <p className="mileageBalance-label">보유 마일리지</p>
                        <div className="mileageBalance-point">
                            <p>44,840 P</p><i className="xi-info"></i>
                        </div>
                    </div>
                    <div className="totalEarnablePoints-wrap type2 px-20">
                        <p className="label">적립 가능한 적립금 합계</p>
                        <p className="totalEarnablePoints">30,000P</p>
                    </div>
                </section>
                <section>
                    <div className="tab-menu-type3 mb-10 mt-10">
                        <div className="tab-menu-bar">
                            <button className="tab-item active">전체</button>
                            <button className="tab-item">적립</button>
                            <button className="tab-item">사용</button>
                            <button className="tab-item">소멸</button>
                        </div>
                    </div>
                    <div className="rewardPoints-list-type1 px-20">
                        <ul>
                            {
                                points.data.map((point)=>{
                                    return(
                                        <li key={point.id}>
                                            <PointsItemType1 point={point}/>
                                        </li>
                                    )
                                })
                            }
                            <li>
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
                            </li>
                            <li>
                                <div className="rewardPoints-item-type1">
                                    <p className="date mb-10">2024.00.00</p>
                                    <div className="rewardPoints-item-content-wrap mb-10">
                                        <div className="rewardPoints-item-title-wrap">
                                            <p className="title">주문사용</p>
                                            <p className="num">Order20240000-000000</p>
                                        </div>
                                        <p className="points">+1,000P</p>
                                    </div>
                                    <div className="rewardPointInfo-wrap">
                                        <p className="usageType">리뷰적립</p>
                                        <p className="expirationDate">2029.00.00 소멸예정</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
