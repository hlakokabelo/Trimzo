import { createContext, useEffect, useState } from "react";
import { log_in, log_out, sign_up } from "../services/authServices";
import type { User } from "../types/user.types";
import type { ApiResponse } from "../types/auth.type";

type AuthContextType = {
  user: User | null;
  updateUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<ApiResponse>;
  signup: (
    email: string,
    password: string,
    username: string,
  ) => Promise<ApiResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /***
   * updates user state and sets user to localstorage
   * removes user from localstorage on logout
   */
  const updateUser = (user: User | null) => {
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }
    //log-out
    setUser(null);
    localStorage.removeItem("user");
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<ApiResponse> => {
    const result = await log_in({ email, password });

    if (result.success) {
      updateUser(result.data.user);
    } else {
      console.log("Error:", result.error?.message ?? "Unknown error");
    }
    return result;
  };
  const signup = async (
    email: string,
    password: string,
    username: string,
  ): Promise<ApiResponse> => {
    const result = await sign_up({ email, password, username });
    if (result.success) {
      updateUser(result.data.user);

      //setUser(user);
    } else {
      console.log("Error:", result.error?.message ?? "Unknown error");
    }
    return result;
  };

  const logout = async () => {
    await log_out();
    updateUser(null);
  };
  const values: AuthContextType = { user, updateUser, signup, login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
