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
            <div className="popup-wrap add-bottomNav" role="dialog" aria-modal="true" aria-label="카테고리 목록">
                <div 
                    className="popup-wrap-bg" 
                    onClick={() => { setIsPopup(false) }}
                    aria-label="팝업 닫기"
                ></div>
                <div className="popup-box-type1 no-x-padding">
                    <div className="popup-close-btn-wrap">
                        <button 
                            className="popup-close-btn" 
                            onClick={() => { setIsPopup(false) }}
                            aria-label="팝업 닫기"
                            type="button"
                        ></button>
                    </div>
                    <div className="popup-content-wrap">
                        <nav className="category-list-type1 pb-20" aria-label="상품 카테고리 네비게이션">
                            {
                                categories.map((category) => (
                                    <div className="category-main" key={category.value}>
                                        <div className="category-main-btn">
                                            <button 
                                                onClick={() => handleCategoryClick(category.value, "")}
                                                aria-label={`${category.text} 카테고리 전체 보기`}
                                                type="button"
                                            >
                                                {category.text}
                                            </button>
                                        </div>
                                        {category.items && (
                                            <ul className="category-sub" role="list">
                                                <li role="listitem">
                                                    <button 
                                                        onClick={() => handleCategoryClick(category.value, "")}
                                                        aria-label={`${category.text} 전체보기`}
                                                        type="button"
                                                    >
                                                        전체보기
                                                    </button>
                                                </li>
                                                {category.items.map((subCategory) => (
                                                    <li
                                                        key={subCategory.value}
                                                        role="listitem"
                                                    >
                                                        <button
                                                            onClick={() => handleCategoryClick(category.value, subCategory.value)}
                                                            aria-label={`${category.text} - ${subCategory.text}`}
                                                            type="button"
                                                        >
                                                            {subCategory.text}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PopupList;
