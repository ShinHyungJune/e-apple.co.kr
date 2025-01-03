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


    const [form, setForm] = useState({
        type: ""
    });
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

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <Header subTitle={'적립금'} />

            <div className="body">
                {
                    isClient &&
                    <>
                        <section>
                            <div className="mileageBalance-wrap px-20">
                                <p className="mileageBalance-label">보유 마일리지</p>
                                <div className="mileageBalance-point">
                                    <p>{(user.points || 0).toLocaleString()} P</p><i className="xi-info"></i>
                                </div>
                            </div>
                            <div className="totalEarnablePoints-wrap type2 px-20">
                                <p className="label">적립 가능한 적립금 합계</p>
                                <p className="totalEarnablePoints">{user.available_deposit_point}p</p>
                            </div>
                        </section>
                        <section>
                            <div className="tab-menu-type3 mb-10 mt-10">
                                <div className="tab-menu-bar">
                                    <button
                                        className={`tab-item ${form.type === "" ? "active" : ""}`}
                                        onClick={() => setForm({ type: "" })}
                                    >
                                        전체
                                    </button>
                                    <button
                                        className={`tab-item ${form.type === "deposit" ? "active" : ""}`}
                                        onClick={() => setForm({ type: "deposit" })}
                                    >
                                        적립
                                    </button>
                                    <button
                                        className={`tab-item ${form.type === "withdrawal" ? "active" : ""}`}
                                        onClick={() => setForm({ type: "withdrawal" })}
                                    >
                                        사용
                                    </button>
                                    <button
                                        className={`tab-item ${form.type === "expiration" ? "active" : ""}`}
                                        onClick={() => setForm({ type: "expiration" })}
                                    >
                                        소멸
                                    </button>
                                </div>
                            </div>
                            <div className="rewardPoints-list-type1 px-20">
                                <ul>
                                    {
                                        points.data.map((point) => {
                                            return (
                                                <li key={point.id}>
                                                    <PointsItemType1 point={point} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </section>
                    </>
                }

            </div>
        </>
    );
}
