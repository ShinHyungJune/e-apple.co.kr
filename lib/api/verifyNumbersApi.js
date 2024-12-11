import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const verifyNumbersApi = {
    

    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/verify-numbers", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    
    update(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.put("/api/verify-numbers", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

}
export default verifyNumbersApi;