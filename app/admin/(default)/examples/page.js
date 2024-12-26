"use client";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import examplesApi from "@/lib/api/admin/examplesApi";
import {useDispatch} from "react-redux";

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [items, setItems] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        }
    });

    const [categories, setCategories] = useState({
        data: [],
        meta: {
            current_page: 1,
            last_page: 1,
            total: 0,
        }
    });

    const initialForm = {
        page: 1,
        word: '',
        ids: [],
    };

    const [form, setForm] = useState({
        page: searchParams.get('page') || 1,
        word: searchParams.get('word') || '',

        ids: [],
    });

    useEffect(() => {
        if (isFirstRender)
            return setIsFirstRender(false);

        setForm({...form, page: "1"});

        // page 외 값이 변할때만 page를 1로 초기화, ids가 변할때 page를 1로 초기화하지 않도록 처리함
    }, [JSON.stringify({ ...form, page: undefined, ids: undefined, word:undefined })]);

    useEffect(() => {
        const queryString = new URLSearchParams(form).toString();
        window.history.replaceState(null, '', `?${queryString}`);

        // 페이지 이동하거나 필터 바꾸면 선택값 초기화 필요
        setForm({...form, ids: []});

        getItems();
        
        // ids가 변할때는 getItems 호출하면 안됨
    }, [JSON.stringify({ ...form, ids: undefined, word:undefined })]);

    const getItems = (e = null) => {
        if(e)
            e.preventDefault();

        examplesApi.index(form, (response) => {
            setItems(response.data);
        })
    }

    const destroy = () => {
        examplesApi.destroy(form, (response) => {
            setItems({
                ...items,
                data: items.data.filter(itemData => !form.ids.includes(itemData.id))
            });

            setForm({
                ...form,
                ids: []
            });
        });
    }

    const isToggleAll = form.ids.length > 0 && form.ids.length === items.data.length;

    const toggleAll = () => {
        if(isToggleAll)
            return setForm({...form, ids: []});

        return setForm({...form, ids: items.data.map(item => item.id)});
    }

    const toggle = (item) => {
        if(form.ids.includes(item.id)) {
            return setForm({
                ...form,
                ids: form.ids.filter(id => id != item.id)
            });
        }

        return setForm({
            ...form,
            ids: [...form.ids, item.id]
        });
    }

    return (
        <div className="main-inner">
            <div className="page-top">
                <div className="fragment">
                    <h3 className="page-top-title">샘플 목록</h3>
                    <p className="page-top-body">총 {items.meta.total}개</p>
                </div>

                <div className="fragment">
                    <div className="m-spaces type01">
                        <div className="m-space-wrap">
                            <div className="m-space">
                                <form action="" onSubmit={(e) => {setForm({...form, page: 1}); getItems(e);}}>
                                    <div className="m-input-search type01">
                                        <input
                                            type="text"
                                            placeholder="검색어를 입력하세요."
                                            value={form.word}
                                            onChange={(e) => setForm({...form, word: e.target.value})}
                                        />

                                        <button type={"submit"}>
                                            <i className="xi-search deco"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="m-space-wrap">
                            <div className="m-space">
                                <div className="m-input-select type01">
                                    <select name="" id="">
                                        <option value="">선택</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="m-space-wrap">
                            <div className="m-space">
                                <button className="m-btn type01" onClick={destroy}>
                                    삭제하기
                                </button>
                            </div>
                        </div>
                        <div className="m-space-wrap">
                            <div className="m-space">
                                <Link href="/admin/examples/create" className="m-btn type01 bg-primary white">
                                    생성하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20"></div>

            <div className="m-spaces type01" style={{justifyContent:'space-between'}}>
                <div className="m-space-wrap">
                    <div className="m-space">
                        <div className="m-tabs type01">
                            <button className={`m-tab ${form.category_id == '' ? 'active' : ''}`} onClick={() => {setForm({...form, category_id: ''})}}>전체</button>
                            {
                                categories.data.map(category =>  <button key={category.id} className={`m-tab ${form.category_id == category.id ? 'active' : ''}`} onClick={() => {setForm({...form, category_id: category.id})}}>{category.title}</button>)
                            }
                        </div>
                    </div>
                </div>
                <div className="m-space-wrap">
                    <div className="m-space">
                        <div className="m-tabs type01">
                            <button className={`m-tab active`} onClick={() => {setForm({...initialForm})}}><i className="xi-rotate-right"></i> 검색 초기화</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-spaces type01">
                <div className="m-space-wrap">
                    <div className="m-space">
                        <div className="m-box type01">
                            <div className="m-table-wrap type01">
                                <table className="m-table type01">
                                    <colgroup>
                                        <col style={{width: "10%"}}/>

                                        <col />
                                        <col />
                                        <col />
                                        <col />

                                        <col style={{width: "10%"}}/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>
                                            <div className="m-input-checkbox type01">
                                                <input type="checkbox" id="" checked={isToggleAll} onChange={() => {}}/>
                                                <label htmlFor="" onClick={toggleAll}></label>
                                            </div>
                                        </th>

                                        <th>이미지</th>
                                        <th>텍스트</th>
                                        <th>url</th>
                                        <th>태그 (분류 직관적 구분)</th>

                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.data.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="m-input-checkbox type01">
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${item.id}`}
                                                        checked={form.ids.includes(item.id)}
                                                        onChange={() => {}}
                                                    />
                                                    <label htmlFor={`checkbox-${item.id}`} onClick={() => toggle(item)}></label>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="m-ratioBox-wrap type01">
                                                    <div className="m-ratioBox" style={{ backgroundImage: `url(${item.img ? item.img.url : ''})` }}></div>
                                                </div>
                                            </td>
                                            <td>{item.title}</td>
                                            <td>
                                                <a href={item.url} target={"_blank"} className={'link'}>바로가기</a>
                                            </td>
                                            <td>
                                                <div className="m-spaces type01">
                                                    <div className="m-space-wrap">
                                                        <div className="m-tag type01 state0">상태1</div>
                                                    </div>
                                                    <div className="m-space-wrap">
                                                        <div className="m-tag type01 state1">상태2</div>
                                                    </div>
                                                    <div className="m-space-wrap">
                                                        <div className="m-tag type01 state2">상태3</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="m-spaces type01 justify-flex-end">
                                                    <div className="m-space-wrap">
                                                        <div className="m-space">
                                                            <Link href={`/admin/examples/create?id=${item.id}`} className="m-btn type02">
                                                                <i className="xi-pen"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-20"></div>

                        <Pagination form={form} setForm={setForm} meta={items.meta} />
                    </div>
                </div>
            </div>
        </div>
    );
}
