"use client";
import type { AuthState, User } from "@/types";
import { create } from "zustand";

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
            first_name: user.first_name,
            last_name: user.last_name,
            is_student: user.is_student,
            is_landlord: user.is_landlord,
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
