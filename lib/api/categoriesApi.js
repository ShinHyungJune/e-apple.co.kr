import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const categoriesApi = {
    // 카테고리 목록 
    indexCategories(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/categories/products", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 서브 카테고리 목록
    indexSubCategories(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get(`/api/categories/products/${id}/subcategories`, {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
}
export default categoriesApi;