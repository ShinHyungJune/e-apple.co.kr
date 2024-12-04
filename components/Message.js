import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";

export default function Message({name}) {
    const dispatch = useDispatch();
    const message = useSelector(state => state.app.message);

    const close = () => {
        dispatch(actions.setMessage(null));
    }

    return (
        <>
            {
                message
                    ? (
                        <div className="m-pop type01">
                            <div className="m-pop-inner">
                                <div className="m-pop-description">{message}</div>

                                <div className="m-pop-btns">
                                    <button className="m-pop-btn" onClick={close}>확인</button>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
        </>
    );
}