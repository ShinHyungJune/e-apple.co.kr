"use client";
import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";
import usersApi from "@/lib/api/usersApi";
import Error from "@/components/Error";
import PopupManager from "@/components/popups/PopupManager";

export default function Page() {
    const router = useRouter();
    // 상태 관리
    const [ids, setIds] = useState("");
    const [password, setPassword] = useState("");
    const [activePopup, setActivePopup] = useState('');
    const searchParams = useSearchParams();

    const dispatch = useDispatch();

    function login(e) {
        e.preventDefault();

        usersApi.login(
            {
                ids: ids,
                password: password,
            },
            (response) => {
                dispatch(actions.setUser(response.data.data.user));
                dispatch(actions.setToken(response.data.data.token));

                const redirectUrl = searchParams.get('redirect') || "/";

                router.push(redirectUrl);
            },
            (error) => {
                
            }
        );
    }

    const openPopup = (popupName) => {
        setActivePopup(popupName);
    }

    const closePopup = () => {
        setActivePopup('');
    }



    return (
            <>
                <div className="popup-box page fixed">
                    <div className="box basic active" data-name="popup01">
                        <div className="login-box">
                            <div className="login-logo">
                                <h2>
                                    <img src="/image/logo.png" alt="로고" />
                                </h2>
                            </div>
                            <div className="login-form">
                                <div className="input-box">
                                    <input
                                            type="text"
                                            placeholder="아이디"
                                            value={ids}
                                            onChange={(e) => setIds(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    login(e); // 엔터키 누르면 login 함수 호출
                                                }
                                            }}
                                    />
                                </div>
                                <Error name={'ids'} />
                                <div className="input-box mt8">
                                    <input
                                            type="password"
                                            placeholder="비밀번호"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    login(e); // 엔터키 누르면 login 함수 호출
                                                }
                                            }}
                                    />
                                </div>
                                <Error name={'password'} />
                            </div>
                            <div className="login-link">
                                <div className="check-box">
                                    <input type="checkbox" name="check" id="check" />
                                    <label htmlFor="check">자동로그인</label>
                                </div>
                                <ul>
                                    <li>
                                        <a href="" onClick={(e) => {
                                            e.preventDefault(); // 기본 동작인 페이지 리로드를 막음
                                            openPopup("PopupFindId"); // 팝업 열기 함수 실행
                                        }}
                                        >
                                            아이디 찾기
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" onClick={(e) => {
                                            e.preventDefault(); // 기본 동작인 페이지 리로드를 막음
                                            openPopup("PopupFindPassword"); // 팝업 열기 함수 실행
                                        }}
                                        >
                                            비밀번호 찾기
                                        </a>
                                    </li>
                                </ul>
                                <div className="button-box">
                                    <a href="" onClick={login} className="btn btn-black lg radius h50 f17">로그인</a>
                                </div>
                            </div>
                            <div className="login-social">
                                <div>
                                    <p>간편 로그인이 필요하신가요?</p>
                                    <b>SNS 계정 로그인</b>
                                </div>
                                <ul>
                                    <li className="kakao"><a href="">카카오</a></li>
                                    <li className="naver"><a href="">네이버</a></li>
                                    <li className="google"><a href="">구글</a></li>
                                </ul>
                            </div>
                            <div className="login-member">
                                <Link href="/users/create">
                                    <div>
                                        <small>회원가입하고 다양한 상품을 확인해보세요.</small>
                                        <p><b>아직 장인의 상패 회원</b>이 아니신가요?</p>
                                    </div>
                                </Link>
                                <p>회원가입 시 혜택 3천원 적립 | 구매시 2% 적립</p>
                            </div>
                            <div className="login-nomember">
                                <a href="" onClick={(e) => {
                                    e.preventDefault();
                                    openPopup("PopupOrderSearch")
                                }}>
                                    <p>비회원 주문조회</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <PopupManager
                        activePopup={activePopup}
                        openPopup={openPopup}
                        closePopup={closePopup}
                />
            </>

    );
}
