"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Error";
import { actions } from "@/app/store";
// 리덕스
import { useDispatch, useSelector } from "react-redux";

import Header from "@/components/Header";
import usersApi from "@/lib/api/usersApi";

export default function page() {
    const router = useRouter();
    const dispatch = useDispatch();

    // 유저 정보 관리
    const user = useSelector(state => state.app.user);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);


    function destroy() {
        const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        if (isConfirmed) {
            usersApi.destroy({}, (response) => {
                alert("탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
                router.push("/login")
            });
        } else {
            alert("탈퇴가 취소되었습니다.");
        }
    }

    function update(e) {
        const isChecked = e.target.checked; // true: 체크, false: 체크 해제
        usersApi.update(
            { is_agree_promotion: isChecked }, // true 또는 false로 전송
            (response) => {
                usersApi.show();
            }
        );
    }



    return (
        <>
            <Header subTitle={"회원정보수정"} />
            <div className="body">
                {
                    isClient &&
                    <>
                        <section>
                            {/* 로그인 정보 */}
                            <div className="login-info-wrap px-20 pb-20">
                                <p className="label">로그인 정보</p>
                                <div className="sns-login-info-list bd-bt-sm pb-20">
                                    <ul>
                                        <li>
                                            <img src="/images/sns-kakao-off.png" alt="카카오 로그인" />
                                        </li>
                                        <li>
                                            <img src="/images/sns-naver-off.png" alt="네이버 로그인" />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 회원 정보 */}
                            <div className="price-information-list pb-20 px-20">
                                <p className="price-information-title">회원정보</p>
                                <ul className="bd-bt-sm pb-20">
                                    <li>
                                        <div className="price-information">
                                            <p className="label">성명</p>
                                            <p className="price">{user.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">연락처</p>
                                            <p className="price">{user.phone}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="price-information">
                                            <p className="label">이메일</p>
                                            <p className="price">{user.email}</p>
                                        </div>
                                    </li>
                                    <li className="mt-10">
                                        <Link href="/mypage/users/password" className="btn wht">
                                            비밀번호 변경
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* 동의 체크박스 */}
                            <div className="agreement-checkbox-list px-20 bd-bt pb-20 mb-40">
                                <ul>
                                    <li>
                                        <div className="checkbox-type1">
                                            <input
                                                type="checkbox"
                                                checked={user.is_agree_promotion} // true이면 체크, false이면 체크 해제
                                                id="checkbox-02"
                                                onChange={update} // update 함수 연결
                                            />
                                            <label htmlFor="checkbox-02">광고성 정보 수신 동의</label>
                                        </div>
                                        <a href="#">상세보기</a>
                                    </li>
                                </ul>
                            </div>

                            {/* 영수증 보기 버튼 */}
                            <div className="underline-btn-wrap mb-60">
                                <button onClick={() => { destroy() }} className="underline-btn">회원탈퇴</button>
                            </div>
                        </section>
                    </>
                }
            </div>
        </>
    );
}
