"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import NoListData from "@/components/NoListData";
import productsApi from "@/lib/api/productsApi";
import ProductItemType1 from "@/components/library/ProductItemType1";
import Pagination from "@/components/Pagination";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [products, setProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });

    const initialForm = {
        page: 1,
        keyword: '',
        order_by: '',
    };

    const [form, setForm] = useState({
        page: searchParams.get('page') || 1,
        keyword: searchParams.get('keyword') || '',
        order_column: searchParams.get("order_column") || "created_at",
        order_direction: searchParams.get("order_direction") || "desc",
    });

    useEffect(() => {
        if (isFirstRender)
            return setIsFirstRender(false);

        setForm({ ...form, page: "1" });

        // page 외 값이 변할때만 page를 1로 초기화, ids가 변할때 page를 1로 초기화하지 않도록 처리함
    }, [JSON.stringify({ ...form, page: undefined, keyword: undefined })]);

    useEffect(() => {
        const queryString = new URLSearchParams(form).toString();
        window.history.replaceState(null, '', `?${queryString}`);

        Index();
    }, [JSON.stringify({ ...form, keyword: undefined })]);


    useEffect(() => {
        Index()
    }, [])

    function Index() {
        productsApi.index("", form, (response) => {
            setProducts(response.data);
        })
    }

    const search = () => {
        const queryString = new URLSearchParams({
            ...form
        }).toString();
    
        // URL 업데이트
        window.history.pushState(null, '', `?${queryString}`);
    
        // 검색 실행
        Index();
    };


    return (
        <>
            <div className="gradient-bg"></div>
            <Header subTitle={'검색'} />

            <div className="popup-content-wrap pt-20">
                <div className="search-box-type1 px-20">
                    <div className="search-input-wrap">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요."
                            value={form.keyword}
                            onChange={(e) => setForm({ ...form, keyword: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    search();
                                }
                            }}
                        />
                        <button onClick={search}>
                            <i className="xi-search"></i>
                        </button>
                    </div>
                </div>
                <div className="filter-wrap-type1 px-20 mt-20">
                    <p className="total-count">총 {products.meta.total}개</p>
                    <select
                        name="order"
                        id="order"
                        value={`${form.order_column},${form.order_direction}`}
                        onChange={(e) => {
                            const [order_column, order_direction] = e.target.value.split(',');
                            setForm((prevForm) => ({
                                ...prevForm,
                                order_column: order_column,
                                order_direction: order_direction,
                            }));
                        }}
                    >
                        <option value="created_at,desc">신상품</option>
                        <option value="reviews_count,desc">리뷰 많은순</option>
                        <option value="price,desc">높은가격순</option>
                        <option value="price,asc">낮은가격순</option>
                    </select>
                </div>
                {
                    products.data.length > 0 ? (
                        <div className="item-list-type1 mt-20">
                            <ul>
                                {
                                    products.data.map((product) => {
                                        return (
                                            <li key={product.id}>
                                                <ProductItemType1 product={product} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : (<NoListData message={"검색하신 상품이 없습니다."}/>)
                }
                {
                    products.data.length > 0 ? (
                        <Pagination
                            form={form}
                            setForm={setForm}
                            meta={products.meta}
                        />
                    ) : null
                }
            </div>
        </>
    );
}
