"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../definitions";
import ErrorMessage from "@/components/utility/ErrorMessage";
import Spinner from "@/components/Spinner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

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
        callbackUrl,
      });

      if (response?.error) {
        setError("Invalid login credentials.");
      } else {
        router.push(callbackUrl);
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
        redirect: false,
      });

      if (response?.error) {
        setError("Login failed. Try with a different account.");
      } else if (response?.ok) {
        router.push(callbackUrl);
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
            <ErrorMessage errorMessage={errors.email.message as string} />
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
            <ErrorMessage errorMessage={errors.password.message as string} />
          )}
        </div>
        {error && <ErrorMessage errorMessage={error} />}
        <Button aria-disabled={loading} type="submit" className="mt-4 w-full">
          Sign in {loading && <Spinner color="gray" />}
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
