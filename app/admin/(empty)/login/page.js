"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Error from "@/components/Error";
import usersApi from "@/lib/api/usersApi";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 상태 관리
    const [ids, setIds] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector(state => state.app.user);
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);
    function login(e) {
        e.preventDefault();

        usersApi.login({
            ids: ids,
            password: password,
        }, (response) => {
            dispatch(actions.setUser(response.data.data.user));
            dispatch(actions.setToken(response.data.data.token));

            const redirectUrl = searchParams.get('redirect') || "/admin/mainBanners";

            router.push(redirectUrl);
        });
    }

    return (
        <div id="wrap">
            <div className="area-login">
                <form onSubmit={login}>
                    <h3 className="title">관리자</h3>

                    <div className="m-input-text type01">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={ids}
                            onChange={(e) => setIds(e.target.value)}
                        />

                        <Error name={ids} />
                    </div>

                    <div className="mt10"></div>

                    <div className="m-input-text type01">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                      <Error name={password} />
                    </div>

                    <div className="mt20"></div>

                    <button type="submit" className="m-btn type03 bg-primary white">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}
