import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const inquirysApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/inquiries", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/inquiries", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete(`/api/inquiries/${id}`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default inquirysApi;