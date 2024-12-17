import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const couponsApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/coupons", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // // 상세
    // show(id, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.get("/api/products/" + id)
    //         .then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // },

    // 저장 쿠폰 다운로드
    download(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/coupons/${id}/download`, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

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
export default couponsApi;