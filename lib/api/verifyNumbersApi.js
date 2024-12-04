import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const verifyNumbersApi = {
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/verifyNumbers", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.patch("/api/verifyNumbers", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

}
export default verifyNumbersApi;