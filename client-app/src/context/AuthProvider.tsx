import { createContext, useEffect, useState } from "react";
import { log_in, log_out, sign_up, type ApiResponse } from "../services/authServices";

type User = {
  _id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, username: string) => Promise<ApiResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await log_in({ email, password });

    //setUser(user);
  };
  const signup = async (email: string, password: string, username: string):Promise<ApiResponse> => {
    const result = await sign_up({ email, password, username });
    if (result.success) {
      console.log("Success:", result.data);
    //setUser(user);

    } else {
      console.log("Error:", result.error?.message ?? "Unknown error");
    }
    return result

  };

  const logout = async () => {
    await log_out();
    setUser(null);
  };
  const values: AuthContextType = { user, loading, signup, login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
