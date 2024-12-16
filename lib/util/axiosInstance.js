// lib/axiosInstance.js
import axios from 'axios';
import store from "@/app/store";
import Cookies from "js-cookie";
import form from "@/lib/util/form";
import {NextResponse} from "next/server";

const {dispatch} = store;


// 진행 중인 요청 수를 관리하는 변수
let requestCount = 0;

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // API의 기본 URL
});


// 로딩 상태 업데이트 함수
const updateLoading = (isLoading) => {
    if (isLoading) {
        // 요청이 시작될 때 카운트를 증가시키고 로딩 상태를 true로 설정
        requestCount += 1;
        dispatch({ type: "app/setLoading", payload: true });
    } else {
        // 요청이 끝날 때 카운트를 감소시키고, 모든 요청이 끝났을 때만 로딩 상태를 false로 설정
        requestCount -= 1;
        if (requestCount === 0) {
            dispatch({ type: "app/setLoading", payload: false });
        }
    }
};


// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        // 요청 시작 시 로딩 상태를 true로 설정
        updateLoading(true);

        // 요청 전에 헤더에 토큰 추가
        const token = Cookies.get('token') || null; //
        const guestId = Cookies.get('guest_id') || null; //
        const data = {};

        if (token)
            config.headers['Authorization'] = `Bearer ${token}`;


        if (guestId) {
            if(config.method === 'get' || config.method === 'delete') {
                config.params
                        ? config.params = {...config.params, guest_id: guestId}
                        : config.params = {guest_id: guestId};
            }
            else {
                config.data
                        ? config.data = {...config.data, guest_id: guestId}
                        : config.data = {guest_id: guestId};
            }
        }

        config.headers['Content-Type'] = 'multipart/form-data';

        if(config.method === 'patch') {
            config.method = 'post';

            config.data['_method'] = 'patch';
        }

        if(config.method !== 'get')
            config.data = form.translate(config.data);

        return config;
    },
    (error) => {
        // 요청 중 에러가 발생한 경우 로딩 상태를 false로 설정
        updateLoading(false);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 요청이 성공적으로 완료된 후 로딩 상태를 false로 설정
        updateLoading(false);

        return response;
    },
    (error) => {
        
        // 요청 실패 후 로딩 상태를 false로 설정
        updateLoading(false);

        if (error.response?.status === 422) {

            // axiosInstance는 리액트 컴포넌트가 아니기 때문에 useDispath를 못쓰고 아래처럼 직접 호출해줘야함
            dispatch({
                type: "app/setErrors",
                payload: error.response.data.errors
            });

            dispatch({
                type: "app/setMessage",
                payload: "입력값을 확인해주세요."
            });
        }

        if (error.response?.status === 401) {
            dispatch({
                type: "app/setUser",
                payload: null
            });

            dispatch({
                type: "app/setToken",
                payload: null
            });

            location.href = location.pathname.includes('admin') ? '/admin/login?redirect=' + location.pathname : '/login?redirect=' + location.pathname;
        }

        if (error.response?.status === 403) {
            dispatch({
                type: "app/setMessage",
                payload: error.response.data.message
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;