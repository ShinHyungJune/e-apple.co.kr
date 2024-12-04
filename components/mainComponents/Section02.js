import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItemType1 from "../library/ProductItemType1";
export default function Section02() {


    return (
        <section className="mb-60">
            <div className="section-title-wrap-type1">
                <p className="section-title">오늘의 특가로 만나는 신선한 과일</p>
                <p className="section-sub-title">오늘만 전하는 혜택을 만나보세요.</p>
            </div>

            <div className="timer-type1">
                <div className="digit" id="hour-tens">0</div>
                <div className="digit" id="hour-units">0</div>
                <span className="separator">:</span>
                <div className="digit" id="minute-tens">0</div>
                <div className="digit" id="minute-units">0</div>
                <span className="separator">:</span>
                <div className="digit" id="second-tens">0</div>
                <div className="digit" id="second-units">0</div>
            </div>
            
            <div className="item-list-type1">
                <ul>
                    <li>
                        <ProductItemType1/>
                    </li>
                    <li>
                        <ProductItemType1/>
                    </li>
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