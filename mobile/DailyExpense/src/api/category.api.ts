import { apiClient } from "../config/axios";
import { REQUEST_URL_CONSTANTS } from "../constants/apiConstants";
import { ApiResponse } from "../types/api";
import { CategoryDTO, CreateCategoryPayload } from "../types/category";


export const addCategoryApi = async (data: CreateCategoryPayload) => {
    const res = await apiClient.post<ApiResponse<CategoryDTO>>
        (REQUEST_URL_CONSTANTS.createCategory, data);

    return res.data;
}