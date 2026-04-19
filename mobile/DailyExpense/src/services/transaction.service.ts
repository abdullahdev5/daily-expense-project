import { createTransactionApi } from "../api/transaction.api";
import { ApiResponse } from "../types/api";
import { CreateTransactionPayload, Transaction } from "../types/transaction";
import { errorResponse, getErrorMessage } from "../utils/error";
import { mapTransaction } from "../utils/mapper";


export const createTransactionService = async (
    data: CreateTransactionPayload
): Promise<ApiResponse<Transaction>> => {
    try {
        const res = await createTransactionApi(data);

        return {
            ...res,

            data: res.data ? mapTransaction(res.data) : undefined
        };
    } catch (e) {
        return errorResponse({ message: getErrorMessage(e) });
    }
}