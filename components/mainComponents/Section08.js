import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewItemType1 from "../library/ReviewItemType1";
export default function Section08() {

    return (
        <section className="pb-40 mb-40 bd-bt">
            <div className="main-review-title-wrap">
                <p># 오늘의 후기</p>
            </div>

            <div className="review-list-type1">
                <ul>
                    <li>
                        <ReviewItemType1 />
                    </li>
                    <li>
                        <ReviewItemType1 />
                    </li>
                    <li>
                        <ReviewItemType1 />
                    </li>
                </ul>
            </div>
        </section>
    )
}