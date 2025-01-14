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

    const Text = `1. 배송 안내
배송 지역: 전국 배송 가능합니다.
배송 기간: 결제 완료 후 2~3일 이내에 배송됩니다. 다만, 도서산간 지역은 추가 시간이 소요될 수 있습니다.
배송 업체: CJ대한통운 또는 롯데택배 또는 한진택배를 이용합니다.

2. 교환 및 반품 안내
교환/반품 신청 가능 기간:
상품 수령일로부터 7일 이내에 신청 가능합니다.
교환/반품이 가능한 경우:
상품에 하자가 있는 경우
배송된 상품이 주문 내용과 다른 경우
교환/반품이 불가능한 경우:
고객님의 부주의로 상품이 훼손된 경우
신선식품의 특성상 단순 변심에 의한 경우
상품의 포장이 훼손되어 상품 가치가 상실된 경우
교환/반품 비용:
상품 하자의 경우 판매자가 비용을 부담하며, 고객 변심에 의한 교환/반품은 왕복 배송비가 청구됩니다.

3. 주문 취소 안내
취소 가능 시점:
결제 완료 후 배송 준비 상태 이전까지 취소가 가능합니다.
취소 방법:
마이페이지에서 직접 취소하거나 고객센터를 통해 요청할 수 있습니다.
취소가 불가능한 경우:
상품이 이미 배송된 경우

4. 환불 안내
환불 처리 기간:
환불 요청 후 3영업일 이내에 처리됩니다.
환불 방법:
결제 수단에 따라 환불됩니다. (카드 결제의 경우 카드 승인 취소, 계좌이체의 경우 입금 계좌로 환불)
환불 불가 사유:
교환/반품이 불가능한 상품에 대한 환불 요청

5. 고객센터 안내
운영 시간: 평일 9:00 ~ 18:00 (주말 및 공휴일 제외)
연락처: 055-944-3533
이메일: bezzangecp@naver.com

6. 유의 사항
상품 수령 후 반드시 상품 상태를 확인해 주시기 바랍니다.
고객님의 사유로 발생한 손해에 대해 판매자는 책임을 지지 않습니다.
신선식품의 특성상 교환/환불이 제한될 수 있으니 상세한 내용을 확인 후 구매 부탁드립니다.
위 규정은 "농업회사법인 열매나무 주식회사"의 정책에 따라 운영됩니다.

    `


    return (
        <section className="m-contents-section">
            <div className="container sm">
                <div className="m-contents-wrap type01">
                    <h2>배송/교환/취소/환불 규정</h2>
                    {Text}
                </div>
            </div>

        </section>
    );
}
