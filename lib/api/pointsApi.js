import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const pointsApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/points", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}
export default pointsApi;