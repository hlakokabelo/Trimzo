import api from "../lib/axios";
import { ROUTES } from "../config/routes";
import type { ApiResponse, LoginPayload, SignupPayload } from "../types/auth.type";

export const sign_up = async (data: SignupPayload): Promise<ApiResponse> => {
  try {
    const res = await api.post(ROUTES.auth.signup, data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.response?.data?.message || err.message || "Signup failed",
        status: err.response?.status,
      },
    };
  }
};

export const log_in = async (data: LoginPayload): Promise<ApiResponse> => {
  try {
    const res = await api.post(ROUTES.auth.login, data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.response?.data?.message || err.message || "Login failed",
        status: err.response?.status,
      },
    };
  }
};

export const log_out = async (): Promise<ApiResponse> => {
  try {
    const res = await api.post(ROUTES.auth.logout);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.response?.data?.message || err.message || "Logout failed",
        status: err.response?.status,
      },
    };
  }
};