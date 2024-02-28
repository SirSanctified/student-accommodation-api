"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions/auth.actions";
import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "sonner";

const SignUpPage = () => {
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("confirmPassword") as string;

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      ("use server");
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password2,
      });
      toast.success("Successfully signed up");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      return;
    }
    window.location.href = "/signin";
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
      <h1 className="mb-8 text-center text-3xl font-bold">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <Input placeholder="First Name" name="firstName" required />
        <Input placeholder="Last Name" name="lastName" required />
        <Input placeholder="Email" type="email" name="email" required />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <Button type="submit">Sign Up</Button>
        <p>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-indigo-500 hover:text-indigo-800"
          >
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignUpPage;
