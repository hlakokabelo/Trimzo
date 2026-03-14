import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_AUTH;

export type SignupPayload = {
  email: string;
  password: string;
  username: string;
};
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status?: number;
  };
}

export type LoginPayload = {
  email: string;
  password: string;
};

export const sign_up = async (data: SignupPayload): Promise<ApiResponse> => {
  try {
    const res = await axios.post(`${API_AUTH}/signup`, { ...data });
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
    const res = await axios.post(`${API_AUTH}/login`, data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.response?.data?.message || err.message || "Log-in failed",
        status: err.response?.status,
      },
    };
  }
};

export const log_out = async () => {
  const res = await axios.post(`${API_AUTH}/logout`);
  return res.data;
};
