import { apiClient } from "../config/axios";
import { REQUEST_URL_CONSTANTS } from "../constants/apiConstants";
import { ApiResponse } from "../types/api";
import { CategoryDTO, CreateCategoryPayload } from "../types/category";


export const addCategoryApi = async (data: CreateCategoryPayload) => {
    const res = await apiClient.post<ApiResponse<CategoryDTO>>
        (REQUEST_URL_CONSTANTS.createCategory, data);

    return res.data;
};

export const getCategoriesApi = async (type: string) => {
    const url = new URL(REQUEST_URL_CONSTANTS.getCategories);
    url.searchParams.append('type', type);


    const res = await apiClient.get<ApiResponse<CategoryDTO[]>>
        (url.toString());

    return res.data;
};