import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const deliveryAddressesApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/delivery_addresses", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/delivery_addresses/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/delivery_addresses", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/delivery_addresses/${id}` , params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/delivery_addresses/${id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default deliveryAddressesApi;