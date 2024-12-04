import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const imagesApi = {
    // 목록

    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/images", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

}
export default imagesApi;