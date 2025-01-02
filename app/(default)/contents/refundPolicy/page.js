"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import {useDispatch} from "react-redux";
import {actions} from "@/app/store";


export default function Page() {
    const router = useRouter();

    const Text = `
    교환/반품 안내*교환 및 반품이 가능한 경우
상품을받은 날로부터 7 일 이내 단, 포장을 개봉하거나 포장이 훼손되어 상품 가치가 상실된 경우에는 교환 / 반품이 불가능합니다.
받은 상품의 내용이 주문 내용과 다른 경우, 또는 배송과정에서 파손 된 경우 경우에는 상품을 받은 날로부터 3 개월 이내, 그 사실을 알게 된 날로부터 30 일 이내.
*교환 및 반품이 불가능한 경우
고객의 고의 또는 손실 상품이 손실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외.
포장을 개봉하거나 포장이 훼손되어 상품 가치가 상실된 경우 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우.
시간의 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우.
복제가 가능한 상품 등의 포장을 훼손한 경우.
(자세한 내용은 E-MAIL 상담을 이용해 주시기 바랍니다.)
※ 고객님의 마음이 바뀌어 교환 · 반품 된 경우 상품 반송 비용은 고객 부담이됩니다.(다른 제품으로의 교환 등 포함)환불안내배송된 상품이 주문상품과 다를 경우, 배송된 제품이 손상되거나 오염된 경우에는 수령하신 날로부터 1일 이내 고객센터로 연락해 주셔야 하며 고객님의 선택에 따라 100% 환불 가능합니다.단, 단순변심에 인한 반품 시 교환 및 적립금대체는 가능하지만 환불은 불가능한 점 양해 부탁드리며 신중한 구매 부탁드립니다.

    `


    return (
        <section className="m-contents-section">
            <div className="container sm">
                <div className="m-contents-wrap type01">
                    <h2>환불처리방침</h2>
                    {Text}
                </div>
            </div>

        </section>
    );
}
