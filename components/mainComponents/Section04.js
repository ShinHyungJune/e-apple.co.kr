import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItemType1 from "../library/ProductItemType1";
export default function Section04({ Products }) {


    return (
        <section className="pb-40 bd-bt">
            <div className="section-title-wrap-type1">
                <p className="section-title">열매나무 인기상품</p>
                <p className="section-sub-title">잘나가는 데에는 이유가 있죠!</p>
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
                <Link href="/basts" className="view-all-btn-type1">
                    전체보기 <i className="xi-angle-right-min"></i>
                </Link>
            </div>
        </section>
    )
}