"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions/auth.actions";
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
      alert("Passwords do not match");
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
    <main className="h-full w-full p-4">
      <h1>Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <Input placeholder="First Name" name="firstName" />
        <Input placeholder="Last Name" name="lastName" />
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </main>
  );
};

export default SignUpPage;
