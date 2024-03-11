"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/store";
import type { User } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function SignInPage() {
  const { loginUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  let user = null;

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/login/`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      user = response.data as User;
      loginUser(user);
      toast.success("Successfully signed in", { id: "signin" });
      formData.delete("email");
      formData.delete("password");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { id: "signin" },
      );
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
    if (!user.is_landlord && !user.is_student) {
      window.location.href = "/my-details";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 text-indigo-950">
      <h1 className="mb-8 w-full text-start text-3xl font-bold">Sign In</h1>
      <form className="flex w-full flex-col gap-4" onSubmit={submitForm}>
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Button type="submit">{isLoading ? "Signing in..." : "Signin"}</Button>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-xl font-bold text-blue-800 hover:text-indigo-800"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
