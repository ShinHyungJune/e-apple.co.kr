import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const certificationApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/certifications", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/certifications", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default certificationApi;