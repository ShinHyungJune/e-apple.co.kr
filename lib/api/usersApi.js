import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";
import store from "@/app/store";
const {dispatch} = store;

const usersApi = {
    // 로그인
    login(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/login", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    show(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/profile", params)
            .then((response) => {
                dispatch({
                type: "app/setUser",
                payload: response.data.data
            });
                 onSuccess(response);
             })
            .catch(error => onFail(error));
    },

    // 회원가입
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/register", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    update(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.patch("/api/users", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },


    // 탈퇴
    destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/users", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default usersApi;