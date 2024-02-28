"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth.actions";
import { useAuthStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  let user = null;

  const { loginUser } = useAuthStore();

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      ("use server");
      user = await login({
        email,
        password,
      });

      toast.success("Successfully signed in");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      return;
    }
    loginUser(user);
    window.location.href = "/";
  }

  return (
    <main className="h-full w-full px-4 py-8 text-indigo-950">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="mx-auto mb-4"
      />
      <h1 className="mb-8 text-center text-3xl font-bold">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Button type="submit">Signin</Button>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-500 hover:text-indigo-800"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
