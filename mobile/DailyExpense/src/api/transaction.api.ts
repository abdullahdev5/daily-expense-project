import { apiClient } from "../config/axios";
import { REQUEST_URL_CONSTANTS } from "../constants/apiConstants";
import { ApiResponse } from "../types/api";
import { CreateTransactionPayload, TransactionDTO } from "../types/transaction";


export const createTransactionApi = async (data: CreateTransactionPayload) => {
    const res = await apiClient.post<ApiResponse<TransactionDTO>>
    (REQUEST_URL_CONSTANTS.createTransaction, data);

    return res.data;
}