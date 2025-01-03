"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";

// import Swiper from "swiper";  // Swiper 기본 가져오기

// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import EditorContent from "@/components/EditorContent";
import { StateBoards } from "@/enums/stateBoards";
import boardsApi from "@/lib/api/boardsApi";
import { formatDate } from "@/lib/util/formatDate";

import InputFiles from "@/components/InputFiles";

export default function page(props) {
    const router = useRouter();
    const id = props.params.id;
    
    const [board, setBoard] = useState();

    // // 스토리 api
    useEffect(() => {
        boardsShow()
    }, [])
    function boardsShow() {
        boardsApi.show(id, (response) => {
            console.log(response.data.data);
            setBoard(response.data.data);
        })
    }

    return (
        <>
            <Header />

            <div className="body main-page">
                {
                    board && (
                        <section className="mb-60 mt-35">
                            <div className="board-title-wrap px-20 mb-40">
                                <p className="board-title mb-20">{board.title}</p>
                                <p className="board-date">{board.start_date} ~ {board.end_date}</p>
                            </div>
                            <div className="board-content-wrap">
                                <EditorContent description={board.content} />
                                <div className="mt-20 px-20">
                                    <InputFiles onlyShow={true} defaultValue={board.files}/>
                                </div>
                            </div>
                        </section>
                    )
                }
            </div>
        </>
    );
}
