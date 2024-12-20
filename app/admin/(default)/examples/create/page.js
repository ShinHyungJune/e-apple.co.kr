"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import examplesApi from "@/lib/api/admin/examplesApi";
import axiosInstance from "@/lib/util/axiosInstance";
import Error from "@/components/Error";
import InputCoords from "@/components/InputCoords";
import InputFiles from "@/components/InputFiles";
import InputImages from "@/components/InputImages";
import InputEditor from "@/components/InputEditor";
import InputObjects from "@/components/InputObjects";


export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [item, setItem] = useState(null);

    const [form, setForm] = useState({
        files: [],
        files_remove_ids: [],

        text: "",
        textarea: "",
        editor: "",
        select: "",
        objects: [],
    });

    useEffect(() => {
        if (id)
            getItem();
    }, []);

    function getItem() {
        examplesApi.show(id, (response) => {
            setItem(response.data.data);

            setForm({
                ...form,
                ...response.data.data,
            });
        })
    }

    function onChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function store() {
        if (id)
            return examplesApi.update(id, form, () => {
                router.back();
            });

        return examplesApi.store(form, () => {
            router.back();
        });
    }

    return (
        <div className="main-inner">
            <div className="m-box type01">
                <div className="m-top type01">
                    <div className="fragment">
                        <h3 className="m-top-title">샘플 상세정보</h3>
                    </div>
                </div>

                <div className="mt-20"></div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">텍스트 <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <div className="m-input-text type01">
                            <input type="text" name={"text"} placeholder="내용을 입력하세요." value={form.text} onChange={onChange} required />
                        </div>


                        <Error name={'text'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">장문 <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <div className="m-input-textarea type01">
                            <textarea name={"textarea"} placeholder="내용을 입력하세요." value={form.textarea} onChange={onChange}></textarea>
                        </div>


                        <Error name={'textarea'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">에디터 <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <InputEditor form={form} setForm={setForm} name={'editor'} />

                        <Error name={'editor'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">셀렉트 <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <div className="m-input-select type01">
                            <select name="select" id="" value={form.select} onChange={onChange}>
                                <option value="">선택</option>
                            </select>
                        </div>

                        <Error name={'select'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title"> <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <div className="m-input-select type01">
                            <select name="select" id="" value={form.select} onChange={onChange}>
                                <option value="">선택</option>
                            </select>
                        </div>

                        <Error name={'select'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">이미지<span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <InputImages
                            multiple={false}
                            defaultValue={item && item.img ? [item.img] : []}
                            onChange={(data) => { setForm({ ...form, files: data }) }}
                            onRemove={(data) => { setForm({ ...form, files_remove_ids: data }) }}
                        />

                        <Error name={'files'} />
                    </div>
                </div>

                <div className="m-input-wrap type01">
                    <div className="m-input-title">
                        <h3 className="title">객체목록 (옵션, 사이즈 등) <span className="star">*</span></h3>
                    </div>
                    <div className="m-input-body">
                        <InputObjects form={form} setForm={setForm} name={'objects'}
                            attributes={[
                                {
                                    name: 'title',
                                    label: '옵션명'
                                },
                                {
                                    name: 'price',
                                    label: '옵션가격',
                                    type: 'number',
                                }
                            ]}
                        />

                        <Error name={'objects'} />
                    </div>
                </div>
            </div>

            <div className="mt-20"></div>

            <div className="page-top">
                <div className="fragment">

                </div>

                <div className="fragment">
                    <div className="m-spaces type01">
                        <div className="m-space-wrap">
                            <div className="m-space">
                                <button className="m-btn type01 bg-primary white" onClick={store}>
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
