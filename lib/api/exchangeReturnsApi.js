import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const exchangeReturnsApi = {
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/exchange_returns", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}
export default exchangeReturnsApi;