import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const popBannersApi = {
    // 팝업배너 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/pop-banners", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 팝업배너 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/pop-banners/${id}`)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
}

export default popBannersApi;