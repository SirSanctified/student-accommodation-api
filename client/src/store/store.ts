import { create } from "zustand";

export type User = {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loginUser: (user: User) =>
    set((state) => ({ ...state, user, isAuthenticated: true })),
  logoutUser: () =>
    set((state) => ({ ...state, user: null, isAuthenticated: false })),
}));
