import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { ROUTES } from "../config/routes";
import { log_in, log_out, sign_up } from "../services/authServices";
import type { User } from "../types/user.types";
import type { ApiResponse } from "../types/auth.type";
import { updateProfile } from "../services/dbServices";

interface IUseAuthStore {
  authUser: User | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<ApiResponse>;
  signup: (
    email: string,
    password: string,
    username: string,
  ) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: User) => Promise<ApiResponse<User>>;
}

export const useAuthStore = create<IUseAuthStore>((set, get) => ({
  authUser: null,
  isCheckingAuth: false,

  updateProfile: async (userData: User) => {
    const response = await updateProfile(userData);
    if (response.success) {
      const { checkAuth } = get();
      await checkAuth();
    }
    return response;
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axiosInstance.post(ROUTES.users.getMe);
      set({ authUser: data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email, password) => {
    const result = await log_in({ email, password });

    if (result.success && result.data?.user) {
      set({ authUser: result.data.user });
    }

    return result;
  },

  signup: async (email, password, username) => {
    const result = await sign_up({ email, password, username });

    if (result.success && result.data?.user) {
      set({ authUser: result.data.user });
    }

    return result;
  },

  logout: async () => {
    await log_out();
    set({ authUser: null });
  },
}));
