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