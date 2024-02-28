"use server";
import type { User } from "@/store/store";
import type { ErrorResponse, LoginType, RegisterType } from "@/types";
import axios, { type AxiosError } from "axios";

export const login = async (user: LoginType): Promise<User> => {
  try {
    const response = await axios.post(
      `http://server:8000/api/auth/login/`,
      user,
      {
        withCredentials: true,
      },
    );
    return response.data as User;
  } catch (error) {
    throw new Error(
      (error as AxiosError)?.response?.data
        ? ((error as AxiosError).response?.data as ErrorResponse)?.detail
        : (error as AxiosError).message,
    );
  }
};

export const register = async (user: RegisterType): Promise<User> => {
  try {
    const response = await axios.post(
      `http://server:8000/api/auth/register/`,
      user,
      {
        withCredentials: true,
      },
    );
    return response.data as User;
  } catch (error) {
    throw new Error(
      (error as AxiosError)?.response?.data
        ? ((error as AxiosError).response?.data as ErrorResponse)?.detail
        : (error as AxiosError).message,
    );
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post("/api/auth/logout", { withCredentials: true });
  } catch (error) {
    throw new Error(
      (error as AxiosError)?.response?.data
        ? ((error as AxiosError).response?.data as ErrorResponse)?.detail
        : (error as AxiosError).message,
    );
  }
};
