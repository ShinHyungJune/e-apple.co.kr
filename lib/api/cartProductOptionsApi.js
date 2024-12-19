import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const cartProductOptionApi = {
    // 저장
    store(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post(`/api/carts/${id}/options`, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, cart_product_option_id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/carts/${id}/options/${cart_product_option_id}` , params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(id, cart_product_option_id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/carts/${id}/options/${cart_product_option_id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}
export default cartProductOptionApi;