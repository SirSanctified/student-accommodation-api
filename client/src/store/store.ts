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
            firstName: user.first_name,
            lastName: user.last_name,
            isStudent: user.is_student,
            isLandlord: user.is_landlord,
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
