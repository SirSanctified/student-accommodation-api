"use server";
import type { ErrorResponse, RegisterType, User } from "@/types";
import axios, { type AxiosError } from "axios";

export const register = async (user: RegisterType): Promise<User> => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/auth/register/`,
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
