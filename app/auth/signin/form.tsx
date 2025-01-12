"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../definitions";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const handleCredentialsLogin: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid login credentials.");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: string) => {
    setLoading(true);
    try {
      const response = await signIn(provider, {
        callbackUrl: "/",
        redirect: true,
      });

      if (response?.error) {
        setError("Login failed. Try with a different account.");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCredentialsLogin)}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="email@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message as string}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button aria-disabled={loading} type="submit" className="mt-4 w-full">
          {loading ? "Submitting..." : "Sign in"}
        </Button>
        <Button
          disabled={loading}
          variant="outline"
          onClick={() => handleProviderSignIn("google")}
          color="indigo"
          className="mt-4"
        >
          <span>Sign in with Google</span>
        </Button>
        <Button
          disabled={loading}
          variant="outline"
          onClick={() => handleProviderSignIn("github")}
          color="indigo"
          className="mt-4"
        >
          <span>Sign in with GitHub</span>
        </Button>
      </div>
    </form>
  );
}
