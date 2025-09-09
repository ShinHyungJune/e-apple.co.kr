import React, { useState } from 'react';
import Error from "@/components/Error";
import verifyNumbersApi from '@/lib/api/verifyNumbersApi';

// 리덕스
import {useDispatch} from "react-redux";
import {actions} from "@/app/store";

function InputVerifyNumber({ contactValue, authCodeValue, verifyNumberState, setVerifyNumberState, onChange}) {


    // 1 = 인증 전, 2 = 인증코드 받은 상태, 3 = 받은 인증 코드로 인증완료
    const [state, setState] = useState(1)

    const dispatch = useDispatch();

    // 번호 보내기
    function store(e) {
        e.preventDefault();
        verifyNumbersApi.store({
            contact: contactValue
        },(response) => {
            setState(2);
            dispatch(actions.setMessage(message));
        });
    }

    function update(e) {
        e.preventDefault();
        verifyNumbersApi.update({
            contact: contactValue,
            number: authCodeValue,
        },(response) => {
            setState(3);
            setVerifyNumberState(true)
        });
    }



    return (
        <div>
            <div className="flex flex-vc">
                <div className={`input-box flex-1 mx560 mr8 ${verifyNumberState ? "readonly" : "" }`}>
                    <label htmlFor="contact-input" className="sr-only">연락처</label>
                    <input
                        id="contact-input"
                        type="text"
                        name="contact"
                        value={contactValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            // 숫자만 입력 가능하도록 필터링
                            if (!isNaN(value) && value.length <= 11) { // 숫자이면서 길이 제한 설정
                                onChange(e); // 숫자일 경우에만 상태 업데이트
                            }
                        }}
                        placeholder="연락처"
                        readOnly={verifyNumberState}
                        inputMode="numeric" // 모바일에서 숫자 키패드가 나오도록 설정
                        aria-label="전화번호 입력"
                        aria-describedby={verifyNumberState ? "verify-complete-message" : "contact-help"}
                    />
                </div>
                {
                    !verifyNumberState ?
                        <div className="button-box w120 w-lg-90">
                            <button 
                                type="button" 
                                className={`btn ${ contactValue ? "btn-bd-black" : "btn-lightgray"} h40 px0 flex-1` }
                                onClick={store}
                                aria-label="연락처 인증번호 발송"
                                disabled={!contactValue}
                            >
                                연락처 확인
                            </button>
                        </div>
                    :""
                }
            </div>
            {
                state == 2 ?
                    <div className="flex flex-vc mt8">
                        <div className="input-box flex-1 mx560 mr8">
                            <label htmlFor="auth-code-input" className="sr-only">인증번호</label>
                            <input
                                id="auth-code-input"
                                type="text"
                                name="authCode"
                                value={authCodeValue}
                                onChange={onChange}
                                placeholder="인증번호"
                                aria-label="인증번호 입력"
                                aria-describedby="auth-code-help"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="button-box w120 w-lg-90">
                            <button 
                                type="button" 
                                className="btn btn-bd-black h40 px0 flex-1"
                                onClick={update}
                                aria-label="인증번호 확인"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                    : ""
            }
            {
                verifyNumberState ?
                    <div id="verify-complete-message" className="m-input-help type01" role="status" aria-live="polite">
                        *인증이 완료되었습니다.
                    </div>
                :""
            }
            <Error name={'contact'} />
        </div>
    );
}

export default InputVerifyNumber;
