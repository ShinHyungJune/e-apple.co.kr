"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import NoListData from "@/components/NoListData";

import ordersApi from "@/lib/api/ordersApi";
import Pagination from "@/components/Pagination";
import OrderProductType1 from "@/components/library/OrderProductType1";

export default function page() {
    const router = useRouter();

    const [visibleItemId, setVisibleItemId] = useState(null);

    const [form, setForm] = useState({
        page: 1,
        take:100,
    });
    const [orders, setOrders] = useState({
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
        ordersApi.index(form, (response) => {
            setOrders(response.data);
        })
    }


    // 주문취소 버튼
    function cancel(id) {
        if (window.confirm("주문을 취소하시겠습니까?")) {
            ordersApi.cancel(id, {}, (response) => {
                dispatch(actions.setMessage("주문취소가 완료되었습니다."));
                index();
            });
        }
    }
    

    return (
        <>
            <Header subTitle={'주문/배송 조회'} />

            <div className="body">
                <section className="mb-40">
                    <div className="order-list-type1">
                        {
                            orders.data.length > 0 ? (
                                <ul>
                                    {
                                        orders.data.map((order) => {
                                            return (
                                                <li key={order.id}>
                                                    <div className="order-item-type1">
                                                        <div className="order-num">
                                                            {
                                                                order.merchant_uid ?
                                                                <Link href={`/mypage/orders/${order.id}`}>
                                                                    {order.merchant_uid} <i className="xi-angle-right"></i>
                                                                </Link>
                                                                : <div></div>
                                                            }
                                                            {['주문접수', '주문완료', '결제대기중', '결제완료', '배송준비중'].includes(order.status) && (
                                                                <button onClick={()=>{cancel(order.id)}} className="order-product-btn">주문취소</button>
                                                            )}
                                                        </div>

                                                        <div className="order-product-list-type1">
                                                            <ul>
                                                                {
                                                                    order.orderProducts.map((orderProduct) => {
                                                                        {
                                                                            return (
                                                                                <li key={orderProduct.id}>
                                                                                    <OrderProductType1 
                                                                                        order={order}
                                                                                        orderProduct={orderProduct}
                                                                                        onSuccess={()=>{index()}}
                                                                                    />
                                                                                </li>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    {/* <li>
                                        <div className="order-item-type1">
                                            <div className="order-num">
                                                <Link href="/deliveryTrackingDetail.html">
                                                    Order20240000-000000 <i className="xi-angle-right"></i>
                                                </Link>
                                                <button className="order-product-btn">주문취소</button>
                                            </div>

                                            <div className="order-product-list-type1">
                                                <ul>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">배송시작</p>
                                                                    <span></span>
                                                                    <p className="date">2024.00.00</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-tracking mb-20">
                                                                <p className="order-tracking-labal">주문배송조회</p>
                                                                <Link href="">
                                                                    <span className="tracking-number">684651321654</span>
                                                                </Link>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="/inquiryPageWrite.html" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                                <Link href="/exchangeReturn.html" className="order-product-btn">
                                                                    반품접수
                                                                </Link>
                                                                <Link href="/exchangeReturn.html" className="order-product-btn">
                                                                    교환접수
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                                    리뷰작성 + 최대 1,500P
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="order-item-type1">
                                            <div className="order-num">
                                                <Link href="/deliveryTrackingDetail.html">
                                                    Order20240000-000000 <i className="xi-angle-right"></i>
                                                </Link>
                                            </div>

                                            <div className="order-product-list-type1">
                                                <ul>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">구매완료</p>
                                                                    <span></span>
                                                                    <p className="date">2024.00.00</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-tracking mb-20">
                                                                <p className="order-tracking-labal">주문배송조회</p>
                                                                <Link href="">
                                                                    <span className="tracking-number">684651321654</span>
                                                                </Link>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                                <Link href="/exchangeReturn.html" className="order-product-btn">
                                                                    교환접수
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                                    리뷰작성 + 최대 1,500P
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">구매완료</p>
                                                                    <span></span>
                                                                    <p className="date">2024.00.00</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-tracking mb-20">
                                                                <p className="order-tracking-labal">주문배송조회</p>
                                                                <Link href="">
                                                                    <span className="tracking-number">684651321654</span>
                                                                </Link>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                                <Link href="/exchangeReturn.html" className="order-product-btn">
                                                                    교환접수
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn big blk">
                                                                    리뷰작성 + 최대 1,500P
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="order-item-type1">
                                            <div className="order-num">
                                                <Link href="">
                                                    Order20240000-000000 <i className="xi-angle-right"></i>
                                                </Link>
                                            </div>

                                            <div className="order-product-list-type1">
                                                <ul>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">취소완료</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="" className="order-product-btn blk">
                                                                    취소상세
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">취소완료</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="" className="order-product-btn blk">
                                                                    취소상세
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="order-item-type1">
                                            <div className="order-num">
                                                <Link href="">
                                                    Order20240000-000000 <i className="xi-angle-right"></i>
                                                </Link>
                                            </div>

                                            <div className="order-product-list-type1">
                                                <ul>
                                                    <li>
                                                        <div className="order-product-item-type1 px-20">
                                                            <div className="order-status-wrap">
                                                                <div className="order-status-box">
                                                                    <p className="order-status">교환완료</p>
                                                                </div>
                                                                <p className="shipping-fee">배송비 3,000원</p>
                                                            </div>

                                                            <div className="order-product-type1">
                                                                <div className="item-img-wrap ratio-box">
                                                                    <img src="/asset/images/test-img.png" alt="" />
                                                                </div>
                                                                <div className="item-content-wrap">
                                                                    <p className="item-title">돌 스위티오 바나나, 1kg 내외, 1개</p>
                                                                    <p className="item-option">4kg(14-16 중대과)</p>
                                                                    <div className="item-count-amount-wrap">
                                                                        <p className="item-count">수량 1개</p>
                                                                        <p className="item-amount">84,800원</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="order-product-btn-wrap">
                                                                <Link href="" className="order-product-btn blk">
                                                                    교환상세
                                                                </Link>
                                                                <Link href="/reviewWrite.html" className="order-product-btn">
                                                                    1:1문의
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            ) : (<NoListData />)
                        }

                    </div>
                    <Pagination
                        form={form}
                        setForm={setForm}
                        meta={orders.meta}
                    />
                </section>
            </div>
        </>
    );
}