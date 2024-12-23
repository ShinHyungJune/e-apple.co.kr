"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import product_reviewApi from "@/lib/api/product_reviewApi";
import InputImages from "@/components/InputImages";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    console.log(id);

    useEffect(() => {
        if (id) {
            show();
        }
    }, []);

    const [item, setItem] = useState(null);
    const [form, setForm] = useState({
        files: [],
        files_remove_ids: [],
        rating: "5",
        review: "",
    });


    const changeForm = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRatingClick = (ratingValue) => {
        setForm({
            ...form,
            rating: ratingValue, // 클릭한 별점 값으로 업데이트
        });
    };

    const show = () => {
        // API 요청
        product_reviewApi.show(id, (response) => {
            setItem(response.data.data);
            setForm({
                ...form,
                ...response.data.data,
            });
        });
    };


    const store = () => {
        if (id) {
            product_reviewApi.update(id, form, (response) => {
                console.log(response);
                router.back();
            });
        } else {
            product_reviewApi.store(form, (response) => {
                console.log(response);
                router.back();
            });
        }
    };


    return (
        <>
            <Header subTitle={'리뷰작성'} />
            <div className="body">
                <section>
                    <div className="order-product-type1 px-20 pb-20 bd-bt-sm">
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
                    <div className="star-score-write px-20 mb-40">
                        <ul>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <li
                                    key={value}
                                    className={form.rating >= value ? "active" : ""}
                                    onClick={() => handleRatingClick(value.toString())} // 별점 클릭 핸들러
                                >
                                    <i className="xi-star"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="input-list-type2 pt-20 pb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">내용입력</p>
                        </div>
                        <div>
                            <div className="textarea-box-type1">
                                <textarea
                                    name="review"
                                    id="review"
                                    rows="10"
                                    placeholder="상품에 대한 솔직한 평가를 작성해주세요.(20자 이상 작성)"
                                    value={form.review} // 상태와 연결
                                    onChange={changeForm} // 입력 값 업데이트
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="input-list-type2 pt-20 pb-20 px-20">
                        <div className="input-list-title-wrap">
                            <p className="input-list-title">사진첨부</p>
                        </div>
                        <div className="input-list-sub-title-wrap">
                            <p className="input-list-sub-title">
                                사진은 최대 20MB 이하의 JPG, PNG, GIF 파일로 첨부 가능합니다.
                            </p>
                        </div>
                        <div>
                            <InputImages
                                multiple={true}
                                defaultValue={item && item.img ? item.img : []}
                                onChange={(data) => { setForm({ ...form, files: data }) }}
                                onRemove={(data) => { setForm({ ...form, files_remove_ids: data }) }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
