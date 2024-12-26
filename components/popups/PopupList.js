import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import categoriesApi from "@/lib/api/categoriesApi";

const PopupList = ({ isPopup, setIsPopup }) => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        indexCategories()
    }, [])

    function indexCategories() {
        categoriesApi.indexCategories({}, (response) => {
            setCategories(response.data.data);
        })
    }


    const handleCategoryClick = (categorieId, subCategorieId) => {
        router.push(`/products?category_id=${categorieId}&subcategory_id=${subCategorieId}` );
        setIsPopup(false);
    };

    if(isPopup)
    return (
        <>
            <div className="popup-wrap add-bottomNav">
                <div className="popup-wrap-bg" onClick={() => { setIsPopup(false) }}></div>
                <div className="popup-box-type1 no-x-padding">
                    <div className="popup-close-btn-wrap">
                        <button className="popup-close-btn" onClick={() => { setIsPopup(false) }}></button>
                    </div>
                    <div className="popup-content-wrap">
                        <div className="category-list-type1 pb-20">
                            {
                                categories.map((category) => (
                                    <div className="category-main" key={category.value}>
                                        <div className="category-main-btn">
                                            <button onClick={() => handleCategoryClick(category.value, "")}>
                                                {category.text}
                                            </button>
                                        </div>
                                        {category.items && (
                                            <ul className="category-sub">
                                                <li onClick={() => handleCategoryClick(category.value, "")}>전체보기</li>
                                                {category.items.map((subCategory) => (
                                                    <li
                                                        key={subCategory.value}
                                                        onClick={() => handleCategoryClick(category.value, subCategory.value)}
                                                    >
                                                        {subCategory.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupList;
