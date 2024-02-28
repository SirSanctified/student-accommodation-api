import { create } from "zustand";

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) =>
    set((state) => ({ ...state, user, isAuthenticated: true })),
  logout: () =>
    set((state) => ({ ...state, user: null, isAuthenticated: false })),
}));
