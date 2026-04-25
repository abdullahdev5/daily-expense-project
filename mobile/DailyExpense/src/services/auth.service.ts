import {
  facebookSignInApi,
  googleSignInApi,
  loginApi,
  registerApi,
} from '../api/auth.api';
import { ERRORS } from '../constants/errorConstants';
import { removeToken, storeToken } from '../storage/auth.storage';
import { userStore } from '../store/userStore';
import { ApiResponse } from '../types/api';
import {
  AuthData,
  AuthDataDTO,
  LoginPayload,
  RegisterPayload,
  User,
  UserDTO,
} from '../types/auth';
import { errorResponse, getErrorMessage } from '../utils/error';
import { mapAuthData, mapUser } from '../utils/mapper';
import { getAccessToken } from './facebook.service';
import { handleGoogleSignIn } from './google.service';

export const registerService = async (
  data: RegisterPayload,
): Promise<ApiResponse<AuthData>> => {
  try {
    const res: ApiResponse<AuthDataDTO> = await registerApi(data);

    if (!res.data?.token) {
      return errorResponse({
        message: 'failed to get the Token!',
      });
    }

    // Storing Token
    storeToken(res.data.token);

    return {
      ...res,
      data: res.data ? mapAuthData(res.data) : undefined,
    };
  } catch (e: any) {
    return errorResponse({ message: getErrorMessage(e) });
  }
};

export const loginService = async (
  data: LoginPayload,
): Promise<ApiResponse<AuthData>> => {
  try {
    const res: ApiResponse<AuthDataDTO> = await loginApi(data);

    if (!res.data?.token) {
      return errorResponse({ message: 'failed to get the Token!' });
    }

    // Storing Token
    storeToken(res.data.token);

    return {
      ...res,
      data: res.data ? mapAuthData(res.data) : undefined,
    };
  } catch (e: any) {
    return errorResponse({
      message: getErrorMessage(e),
    });
  }
};

export const googleSignInService = async (): Promise<ApiResponse<AuthData>> => {
  try {
    const { idToken, error } = await handleGoogleSignIn();

    if (idToken) {
      const res = await googleSignInApi(idToken);

      return {
        ...res,
        data: res.data ? mapAuthData(res.data) : undefined,
      };
    } else {
      return errorResponse({
        message: getErrorMessage(error),
      });
    }
  } catch (e: any) {
    return errorResponse({
      message: getErrorMessage(e),
    });
  }
};

export const facebookSignInService = async (): Promise<
  ApiResponse<AuthData>
> => {
  try {
    const { accessToken, error } = await getAccessToken();

    if (accessToken) {
      const res = await facebookSignInApi(accessToken);

      return {
        ...res,
        data: res.data ? mapAuthData(res.data) : undefined,
      };
    } else {
      return errorResponse({
        message: getErrorMessage(error),
      });
    }
  } catch (e) {
    return errorResponse({
      message: getErrorMessage(e),
    });
  }
};