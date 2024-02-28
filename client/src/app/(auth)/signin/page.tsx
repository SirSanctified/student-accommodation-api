"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth.actions";
import type { FormEvent } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      ("use server");
      await login({
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
    window.location.href = "/";
  }

  return (
    <main className="h-full w-full p-4">
      <h1>Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Button type="submit">Signin</Button>
      </form>
    </main>
  );
}
