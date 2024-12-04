import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NoListData({message = '데이터가 없습니다.'}) {
    return (
        <div className="m-noListData type01">
            <div className="m-noListData-box">
                <p>{message}</p>
            </div>
        </div>
    );
}


