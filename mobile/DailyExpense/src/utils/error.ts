import { AxiosError, isAxiosError } from "axios";
import { ERRORS } from "../constants/errorConstants";

export const getErrorMessage = (error: unknown): string => {
  // Check if it's an AxiosError
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    // Try server response message first
    return axiosError.response?.data?.message
        || axiosError.message 
        || ERRORS.unknown;
  }

  // Fallback for other errors
  if (error instanceof Error) {
    return error.message;
  }

  return ERRORS.unknown;
};