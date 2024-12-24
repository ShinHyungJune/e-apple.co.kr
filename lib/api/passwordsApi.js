import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const passwordsApi = {
    // 수정
    update(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put("/api/password", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 비밀번호찾기
    findPassword(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/find-password", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 비민번호찾기(비밀번호 Reset)
    resetPassword(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/reset-password", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}
export default passwordsApi;