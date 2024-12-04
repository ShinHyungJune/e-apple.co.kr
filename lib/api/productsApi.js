import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const productsApi = {
    // 목록
    index(category, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/products/" + category, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/examples/" + id)
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