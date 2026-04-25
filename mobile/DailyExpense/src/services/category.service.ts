import { addCategoryApi, getCategoriesApi } from '../api/category.api';
import { fakeCategoriesData } from '../constants/categoryConstants';
import { ApiResponse } from '../types/api';
import { Category, CreateCategoryPayload } from '../types/category';
import { errorResponse, getErrorMessage } from '../utils/error';
import { mapCategory } from '../utils/mapper';

export const createCategoryService = async (
  data: CreateCategoryPayload,
): Promise<ApiResponse<Category>> => {
  try {
    const res = await addCategoryApi(data);

    return {
      ...res,

      data: res.data ? mapCategory(res.data) : undefined,
    };
  } catch (e: any) {
    return errorResponse({
      message: getErrorMessage(e),
    });
  }
};

export const getCategoriesService = async (
  type: string,
): Promise<ApiResponse<Category[]>> => {
  try {
    const res = await getCategoriesApi(type);

    const mappedData = res.data?.map(mapCategory);

    return {
      ...res,

      data: mappedData,
    };
  } catch (e) {
    return errorResponse({ message: getErrorMessage(e) });
  }
};
