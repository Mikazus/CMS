"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDefaultUserForRole, loginApi, logoutApi } from "@/lib/api/auth";
import { ROLE_HOME_ROUTES } from "@/lib/constants/navigation";
import type { LoginPayload, User, UserRole } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_STORAGE_KEY = "layah_user_session";

function setCookie(name: string, value: string, days = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved) as User);
      } else {
        const cookieRole = readCookie("layah_role") as UserRole | null;
        if (cookieRole) {
          setUser(getDefaultUserForRole(cookieRole));
        }
      }
    } catch {
      // Ignore storage error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    const res = await loginApi(payload);
    const cookieDays = payload.rememberMe ? 30 : 1;
    setCookie("layah_token", res.token, cookieDays);
    setCookie("layah_role", res.user.role, cookieDays);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
    setUser(res.user);
    router.push(ROLE_HOME_ROUTES[res.user.role]);
    router.refresh();
  };

  const logout = async () => {
    await logoutApi();
    clearCookie("layah_token");
    clearCookie("layah_role");
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
