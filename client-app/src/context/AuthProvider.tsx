import { createContext, useEffect, useState } from "react";
import { log_in, log_out, sign_up } from "../services/authServices";
import type { User } from "../types/user.types";
import type { ApiResponse } from "../types/auth.type";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<ApiResponse>;
  signup: (email: string, password: string, username: string) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  updateUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user"); // fallback if JSON is corrupted
      }
    }
  }, []);

  // Updates user in state and localStorage
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const login = async (email: string, password: string) => {
    const result = await log_in({ email, password });
    if (result.success && result.data?.user) {
      updateUser(result.data.user);
    }
    return result;
  };

  const signup = async (email: string, password: string, username: string) => {
    const result = await sign_up({ email, password, username });
    if (result.success && result.data?.user) {
      updateUser(result.data.user);
    }
    return result;
  };

  const logout = async () => {
    await log_out();
    updateUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};