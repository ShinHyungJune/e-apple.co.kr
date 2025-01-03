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
                index();
                dispatch(actions.setMessage("주문취소가 완료되었습니다."));
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