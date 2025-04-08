"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/utility/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormSchema } from "../definitions";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const handleSignUp: SubmitHandler<FieldValues> = async (formData) => {
    setLoading(true);
    const { email, password, firstName, lastName } = formData;
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        router.push("/");
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
            <ErrorMessage errorMessage={errors.email.message as string} />
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
                    <li key={idx}>
                      <ErrorMessage errorMessage={msg} />
                    </li>
                  ))
                ) : (
                  <li>
                    <ErrorMessage
                      errorMessage={errors.password.message as string}
                    />
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
            <ErrorMessage errorMessage={errors.firstName.message as string} />
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="lasttName">Last Name</Label>
          <Input type="text" {...register("lastName")} />
          {errors.lastName && (
            <ErrorMessage errorMessage={errors.lastName.message as string} />
          )}
        </div>
      </div>

      {error && <ErrorMessage errorMessage={error} />}

      <Button
        aria-disabled={loading}
        type="submit"
        disabled={loading}
        className="mt-4 w-full"
      >
        Sign Up {loading && <Spinner color="gray" />}
      </Button>
    </form>
  );
}
