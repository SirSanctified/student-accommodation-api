"use client";
import { create } from "zustand";

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: (() => {
    if (typeof window !== "undefined") {
      const authData = JSON.parse(localStorage.getItem("auth") ?? "{}") as {
        user: User;
        isAuthenticated: boolean;
      };
      return authData.isAuthenticated;
    }
    return false;
  })(),
  user:
    (() => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("auth") ?? "{}") as {
          user: User;
          isAuthenticated: boolean;
        };
      }
      return null;
    })()?.user ?? null,
  loginUser: (user: User) =>
    set((state) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
          },
          isAuthenticated: true,
        }),
      );
      return {
        ...state,
        user,
        isAuthenticated: true,
      };
    }),
  logoutUser: () =>
    set((state) => {
      localStorage.removeItem("auth");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }),
}));
