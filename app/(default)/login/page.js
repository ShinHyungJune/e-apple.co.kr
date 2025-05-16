"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import Header from "@/components/Header";
import usersApi from "@/lib/api/usersApi";
import Error from "@/components/Error";


export default function Page() {
    const router = useRouter();
    // 상태 관리
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const searchParams = useSearchParams();
    const [token, setToken] = useState(searchParams.get('token'));

    const dispatch = useDispatch();

    useEffect(() => {
        if(token)
            login();
    }, []);

    function login(e) {
        e.preventDefault();
        usersApi.login(
            {
                token: token,
                username: username,
                password: password,
            },
            (response) => {
                // dispatch(actions.setToken(response.data.data.token));

                dispatch(actions.setToken(response.data.access_token));
                dispatch(actions.setUser(response.data.user));

                const redirectUrl = searchParams.get('redirect') || "/";
                
                router.push(redirectUrl);
            },
            (error) => {

            }
        );
    }

    return (
        <>
            <Header/>
            <div className="body login">
                <section className="pb-30 bd-bt">
                    <div className="logo-wrap">
                        <h1> <img src="/images/logo.png" alt="" /></h1>
                    </div>
                    <div className="input-list-type2 px-20 mb-60">
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="text"
                                    placeholder="이메일(아이디)"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            login(e); // 엔터키 누르면 login 함수 호출
                                        }
                                    }}
                                />
                            </div>
                            <Error name={'username'} />
                        </div>
                        <div>
                            <div className="input-txt-box-type1">
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            login(e); // 엔터키 누르면 login 함수 호출
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <Error name={'password'} />
                    </div>
                    <div className="btn-wrap-type1 mb-10">
                        <button className="btn blk" onClick={login}>로그인하기</button>
                    </div>
                    <div className="findAccountOptions px-20 mb-40">
                        <Link href="/users/findId" className="findId">아이디 찾기</Link>
                        <Link href="/users/findPassword" className="findPassword">비밀번호 찾기</Link>
                    </div>
                    <div className="input-list-type2 px-20">
                        <div>
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao`} className="btn ylw">
                                <img src="/images/sns-login-kakao.png" alt="" />
                                카카오 로그인
                            </a>
                        </div>
                        {/* <div>
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/openLoginPop/naverCustom`} className="btn grn">
                                <img src="/images/sns-login-naver.png" alt="" />
                                네이버 로그인
                            </a>
                        </div> */}
                    </div>
                </section>

                <section>
                    <div className="login-bt-wrap px-20 pt-30">
                        <p className="login-bt-label mb-20">아직 회원이 아니신가요?</p>
                        <div className="mb-30">
                            <Link href="/users/create" className="btn bd-blk">
                                열매나무 회원가입
                            </Link>
                        </div>
                        <div className="guestOrderOptions">
                            {/* <a href="" className="guestOrder">비회원 주문하기</a> */}
                            <Link href="/orders/guest" className="guestOrderLookup">비회원 주문조회</Link>
                        </div>
                    </div>
                </section>
            </div>

        </>

    );
}
