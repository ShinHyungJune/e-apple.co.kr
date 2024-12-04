import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";

export default function Error({name}) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.app.errors);

    useEffect(() => {
        dispatch(actions.setErrors({}));
    }, []);

    return (
        <>
            {
                errors[name]
                    ? <div className="m-input-error type01">{errors[name][0]}</div>
                    : null
            }
        </>
    );
}