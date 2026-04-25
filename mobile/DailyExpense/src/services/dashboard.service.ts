import { getDashboardApi } from "../api/dashboard.api";
import { ApiResponse } from "../types/api";
import { DashboardResponse } from "../types/dashboard";
import { errorResponse, getErrorMessage } from "../utils/error"
import { mapDashboardResponse } from "../utils/mapper";


import { Transaction } from '../types/transaction';
import { TransactionType } from '../types/transaction'; // Assuming these enums exist
import { CurrencyCode } from '../types/types';
import { CategoryIcon } from "../types/category";

export const getDashboardService = async (): Promise<ApiResponse<DashboardResponse>> => {
    try {
        const res = await getDashboardApi();

        return {
            ...res,

            data: res.data ? mapDashboardResponse(res.data) : undefined
        };
    } catch (e) {
        return errorResponse({ message: getErrorMessage(e) });
    }
}