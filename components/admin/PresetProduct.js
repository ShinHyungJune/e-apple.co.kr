import React, {useEffect, useState} from 'react';
import Error from "@/components/Error";
import {useDispatch} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";
import {getStatePresetProductOptions, StatePresetProduct} from "@/enums/statePresetProduct";
import {FormatStatePrototype, getStatePrototypeOptions, StatePrototype} from "@/enums/statePrototype";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import feedbacksApi from "@/lib/api/admin/feedbacksApi";

const PresetProduct = ({ presetProduct }) => {

    return (
        <div className={`table-image-box`}>
            <div className="inner">
                {
                    presetProduct.product.img ? <div className="image">
                        <img src={presetProduct.product.img.url} alt="상품 이미지" />
                    </div> : null
                }

                <div className="content">
                    {presetProduct.additional ? (
                        <div className='additional-box'>
                            <p>추가상품</p>
                        </div>
                    ) : null}
                    <p>{presetProduct.product.title}</p>
                    <dl>
                        <dd>{presetProduct.color?.title} {presetProduct.size?.title}</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default PresetProduct;
