import { AxiosResponse } from "axios";
import { apiClient } from "../config/axios";
import { ApiResponse } from "../types/api";
import { AuthDataDTO, LoginPayload, RegisterPayload, UserDTO } from "../types/auth";
import { REQUEST_URL_CONSTANTS } from "../constants/apiConstants";


export const registerApi = async (data: RegisterPayload) => {
    const res = await apiClient.post<ApiResponse<AuthDataDTO>>(
        REQUEST_URL_CONSTANTS.register, data
    );

    return res.data;
}

export const loginApi = async (data: LoginPayload) => {
    const res = await apiClient.post<ApiResponse<AuthDataDTO>>(
        REQUEST_URL_CONSTANTS.login,
        data
    );

    return res.data;
}

export const googleSignInApi = async (idToken: string) => {
    const res = await apiClient.post<ApiResponse<AuthDataDTO>>(
        REQUEST_URL_CONSTANTS.googleAuth,
        { idToken }
    );

    return res.data;
}

export const facebookSignInApi = async (accessToken: string) => {
    const res = await apiClient.post<ApiResponse<AuthDataDTO>>(
        REQUEST_URL_CONSTANTS.facebookAuth,
        { accessToken }
    );

    return res.data;
}


export const getUserApi = async () => {
    const res = await apiClient.get<ApiResponse<UserDTO>>(REQUEST_URL_CONSTANTS.user);

    return res.data;
}