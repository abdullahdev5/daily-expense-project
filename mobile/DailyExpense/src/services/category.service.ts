import { addCategoryApi } from "../api/category.api";
import { ApiResponse } from "../types/api";
import { Category, CreateCategoryPayload } from "../types/category";
import { errorResponse, getErrorMessage } from "../utils/error";
import { mapCategory } from "../utils/mapper";



export const createCategoryService = async (
    data: CreateCategoryPayload
): Promise<ApiResponse<Category>> => {
    try {
        const res = await addCategoryApi(data);

        return {
            ...res,

            data: res.data ? mapCategory(res.data) : undefined
        }
    } catch (e: any) {
        return errorResponse({
            message: getErrorMessage(e),
        });
    }
}