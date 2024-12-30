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

    // 주문상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/orders/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 주문상품상세
    show_order_products(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/order_products/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 저장 (상품 바로구매)
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/orders", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


    // 저장 (장바구니 상품구매)
    store_carts(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/orders/carts", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


    // 수정 (결제시도)
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/orders/${id}` , params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


    // 결제완료
    complete(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/orders/complete", params)
                .then((response) => onSuccess(response))
                .catch(error => onFail(error));
    },


    // 주문확정
    confirm(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/order_products/${id}/confirm`, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 주문취소
    cancel(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/orders/${id}/cancel`, params)
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