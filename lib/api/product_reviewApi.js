import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const product_reviewApi = {
    // 목록 (작성가능한 리뷰)
    indexAvailable(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/product_reviews/available", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 목록 (작성가능한 리뷰)
    indexMine(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/product_reviews/mine", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/product_reviews/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/product_reviews", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put("/api/product_reviews/" + id, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/product_reviews/${id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default product_reviewApi;