import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

export default function Loading({ name }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (loading) {
            setIsVisible(true);
        } else {
            // 로딩이 끝난 후 애니메이션 지속 시간 후에 컴포넌트를 숨깁니다.
            const timer = setTimeout(() => setIsVisible(false), 300); // 300ms 애니메이션 지속 시간
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const close = () => {
        dispatch(actions.setLoading(false));
    };

    return (
        <>
            {isVisible && (
                <div className={`m-loading type01 ${loading ? "fade-in" : "fade-out"}`}>
                    <div className="m-loading__content">
                        <div className="m-loading__spinner"></div>
                        {/* <p>Loading...</p> */}
                    </div>
                </div>
            )}
        </>
    );
}