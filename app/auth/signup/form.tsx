"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema } from "../definitions";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const handleSignUp: SubmitHandler<FieldValues> = async (formData) => {
    setLoading(true);
    const { email, password, firstName, lastName } = formData;
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <div>
              <p className="text-red-500">Password must:</p>
              <ul>
                {Array.isArray(errors.password.message) ? (
                  errors.password.message.map((msg, idx) => (
                    <li key={idx} className="text-red-500">
                      {msg}
                    </li>
                  ))
                ) : (
                  <li className="text-red-500">
                    {errors.password.message as string}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-red-500">
              {errors.firstName.message as string}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="lasttName">Last Name</Label>
          <Input type="text" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-red-500">
              {errors.lastName.message as string}
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button
        aria-disabled={loading}
        type="submit"
        disabled={loading}
        className="mt-4 w-full"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
