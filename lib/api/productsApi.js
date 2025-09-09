import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const productsApi = {
    // 목록
    index(category, params = {}, onSuccess = () => {}, onFail = () => {}) {
        // md_packages는 별도 엔드포인트로 처리
        const url = category === "md_packages" 
            ? "/api/products/md_packages" 
            : "/api/products/" + category;
            
        return axiosInstance.get(url, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/products/" + id)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상품의 후기
    ReviewIndex(id, params, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/products/${id}/reviews`, {
            params: params
        })
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상품의 문의
    InquiryIndex(id, params, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/products/${id}/inquiries`, {
            params: params
        })
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상품의 문의 작성
    InquiryStore(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post(`/api/products/${id}/inquiries`, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    
    // // 저장
    // store(params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.post("/api/admin/examples", params)
    //         .then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // },

    // // 수정
    // update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.patch("/api/admin/examples/" + id, params)
    //         .then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // },

    // // 삭제
    // destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.delete("/api/admin/examples", {
    //         params: params
    //     }).then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // }
}
export default productsApi;