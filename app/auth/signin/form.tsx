"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      });

      if (response?.error) {
        setError("Login failed. Please check your credentials.");
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
    <form onSubmit={handleCredentialsLogin}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* {state} */}
          {/* {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )} */}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )} */}
        </div>
        {/* {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )} */}
        {error && <p style={{ color: "red" }}>{error}</p>}
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
