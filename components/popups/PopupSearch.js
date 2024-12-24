import React, { useState, useEffect } from "react";
import productsApi from "@/lib/api/productsApi";
import NoListData from "../NoListData";
import ProductItemType1 from "../library/ProductItemType1";
import Pagination from "../Pagination";

const PopupSearch = ({ isPopup, setIsPopup }) => {

    const [form, setForm] = useState({
        // search: "",
        page: 1,
    });

    const [products, setProducts] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    });


    useEffect(() => {
        ProductsIndex()
    }, [form])

    function ProductsIndex() {
        productsApi.index("best", form, (response) => {
            setProducts(response.data);
        })
    }

    const search = () => {
        ProductsIndex()
    };


    return (
        <div className="popup-wrap add-bottomNav">
            <div className="popup-wrap-bg"></div>
            <div className="popup-box-type2">
                <div className="popup-close-btn-wrap">
                    <p className="popup-title">검색</p>
                    <button className="popup-close-btn" onClick={() => { setIsPopup(false) }}><i className="xi-close"></i></button>
                </div>

                <div className="popup-content-wrap pt-20">
                    <div className="search-box-type1 px-20">
                        <div className="search-input-wrap">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요."
                                value={form.search}
                                onChange={(e) => setForm({ ...form, search: e.target.value })}
                            />
                            <button onClick={search}>
                                <i className="xi-search"></i>
                            </button>
                        </div>
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
                        ) : null
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
            </div>
        </div>
    );
};

export default PopupSearch;
