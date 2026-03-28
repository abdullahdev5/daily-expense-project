import {
  facebookSignInApi,
  getUserApi,
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
import { getErrorMessage } from '../utils/error';
import { mapAuthData, mapUser } from '../utils/mapper';
import { getAccessToken } from './facebook.service';
import { handleGoogleSignIn } from './google.service';

export const registerService = async (
  data: RegisterPayload,
): Promise<ApiResponse<AuthData>> => {
  try {
    const res: ApiResponse<AuthDataDTO> = await registerApi(data);

    if (!res.data?.token) {
      return {
        success: false,
        message: ERRORS.unknown,
        data: undefined,
      };
    }

    // Storing Token
    storeToken(res.data.token);

    return {
      ...res,
      data: res.data ? mapAuthData(res.data) : undefined,
    };
  } catch (e: any) {
    return {
      success: false,
      message: getErrorMessage(e),
      data: undefined,
    };
  }
};

export const loginService = async (
  data: LoginPayload,
): Promise<ApiResponse<AuthData>> => {
  try {
    const res: ApiResponse<AuthDataDTO> = await loginApi(data);

    if (!res.data?.token) {
      return {
        success: false,
        message: ERRORS.unknown,
        data: undefined,
      };
    }

    // Storing Token
    storeToken(res.data.token);

    return {
      ...res,
      data: res.data ? mapAuthData(res.data) : undefined,
    };
  } catch (e: any) {
    return {
      success: false,
      message: getErrorMessage(e),
      data: undefined,
    };
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
    } else if (error) {
      return {
        success: false,
        message: error,
        data: undefined,
      };
    } else {
      return {
        success: false,
        message: ERRORS.unknown,
      };
    }
  } catch (e: any) {
    return {
      success: false,
      message: getErrorMessage(e),
      data: undefined,
    };
  }
};

export const facebookSignInService = async (): Promise<
  ApiResponse<AuthData>
> => {
  const { accessToken, error } = await getAccessToken();

  if (accessToken) {
    const res = await facebookSignInApi(accessToken);

    return {
      ...res,
      data: res.data ? mapAuthData(res.data) : undefined,
    };
  } else if (error) {
    return {
      success: false,
      message: error,
      data: undefined,
    };
  } else {
    return {
      success: false,
      message: ERRORS.unknown,
    };
  }
};

export const getUserService = async (): Promise<ApiResponse<User>> => {
  try {
    const res: ApiResponse<UserDTO> = await getUserApi();

    return {
      ...res,
      data: res.data ? mapUser(res.data) : undefined,
    };
  } catch (e: any) {
    return {
      success: false,
      message: getErrorMessage(e),
      data: undefined,
    };
  }
};

export const logoutService = () => {
  removeToken();
  userStore.getState().logout();
  console.log('Logout()');
};
