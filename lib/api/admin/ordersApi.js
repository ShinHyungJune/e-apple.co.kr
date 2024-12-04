import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const ordersApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/orders", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/orders/" + id)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/admin/orders", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.patch("/api/admin/orders/" + id, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/admin/orders", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default ordersApi;