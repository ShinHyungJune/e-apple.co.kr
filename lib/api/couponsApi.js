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

    // 사용가능한 쿠폰 목록
    indexUserCoupons(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/user_coupons", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 저장 쿠폰 다운로드
    download(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put(`/api/coupons/${id}/download`, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

}
export default couponsApi;