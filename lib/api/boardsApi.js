import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const boardsApi = {
    // 게시판 카테고리 설정 불러오기
    init(ContentType, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/boards/"+ ContentType +"/init", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    // 목록
    index(ContentType, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/boards/"+ ContentType, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/examples/" + id)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // // 저장
    // store(params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.post("/api/admin/examples", params)
    //         .then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // },

    // // 수정
    // update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.patch("/api/admin/examples/" + id, params)
    //         .then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // },

    // // 삭제
    // destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
    //     return axiosInstance.delete("/api/admin/examples", {
    //         params: params
    //     }).then((response) => onSuccess(response))
    //         .catch(error => onFail(error));
    // }
}
export default boardsApi;