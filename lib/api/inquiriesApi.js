import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const inquiriesApi = {
    // 1:1 문의 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/inquiries", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 1:1 문의 저장
    store(params = {}, onSuccess = () => { }, onFail = () => { }) {
        return axiosInstance.post("/api/inquiries", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 1:1 문의 삭제
    destroy(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/inquiries/${id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상품 문의 목록
    indexProductsInquiries(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/products/inquiries/mine", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


   
}
export default inquiriesApi;