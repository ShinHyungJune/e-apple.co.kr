import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const mainApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/main", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}
export default mainApi;