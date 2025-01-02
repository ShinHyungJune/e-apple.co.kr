import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItemType1 from "../library/ProductItemType1";
export default function Section02({ Products = [] }) {

    const [timeLeft, setTimeLeft] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
            const diff = tomorrow - now;

            const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
            const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

            setTimeLeft({ hours, minutes, seconds });
        };

        updateTimer(); // 초기 업데이트
        const timerId = setInterval(updateTimer, 1000); // 매초 업데이트

        return () => clearInterval(timerId); // 컴포넌트 언마운트 시 클리어
    }, []);


    if (Products.length > 0)
        return (
            <section className="mb-60">
                <div className="section-title-wrap-type1">
                    <p className="section-title">오늘의 특가로 만나는 신선한 과일</p>
                    <p className="section-sub-title">오늘만 전하는 혜택을 만나보세요.</p>
                </div>

                <div className="timer-type1">
                    <div className="digit">{timeLeft.hours[0]}</div>
                    <div className="digit">{timeLeft.hours[1]}</div>
                    <span className="separator">:</span>
                    <div className="digit">{timeLeft.minutes[0]}</div>
                    <div className="digit">{timeLeft.minutes[1]}</div>
                    <span className="separator">:</span>
                    <div className="digit">{timeLeft.seconds[0]}</div>
                    <div className="digit">{timeLeft.seconds[1]}</div>
                </div>

                <div className="item-list-type1">
                    <ul>
                        {
                            Products.map((saleProduct) => {
                                return (
                                    <li key={saleProduct.id}>
                                        <ProductItemType1 product={saleProduct} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="view-all-btn-wrap">
                    <Link href="/" className="view-all-btn-type1">
                        전체보기 <i className="xi-angle-right-min"></i>
                    </Link>
                </div>
            </section>
        )
}