import { createWalletApi } from "../api/wallet.api";
import { ApiResponse } from "../types/api";
import { CreateWalletPayload, Wallet } from "../types/wallet";
import { errorResponse, getErrorMessage } from "../utils/error";
import { mapWallet } from "../utils/mapper";


export const createWalletService = async (
    data: CreateWalletPayload
): Promise<ApiResponse<Wallet>> => {
    try {

        const res = await createWalletApi(data);

        return {
            ...res,
            data: res.data ? mapWallet(res.data) : undefined
        };
    } catch (e: any) {
        return errorResponse({
            message: getErrorMessage(e),
        })
    }
}