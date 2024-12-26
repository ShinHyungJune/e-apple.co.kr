import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const ordersApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/orders", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/orders/" + id)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 주문상품상세
    show_order_products(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/order_products/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/orders", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.patch("/api/orders/" + id, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/orders", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }


    
}
export default ordersApi;