import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const cartsApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/carts", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/carts", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 선택삭제
    idsDestroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/carts/ids", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/carts/${id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 품절 삭제
    soldOutDestroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/carts/sold-out", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
    
}
export default cartsApi;