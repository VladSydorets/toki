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
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

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
    const { email, password, passwordConfirmation, firstName, lastName } =
      formData;

    if (password !== passwordConfirmation) {
      setDoPasswordsMatch(false);
      setLoading(false);
      return;
    }

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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:gap-6 justify-between w-full">
          <div className="w-full">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              placeholder="Enter your first name"
              className="text-sm"
              {...register("firstName")}
            />
            {errors.firstName && (
              <ErrorMessage errorMessage={errors.firstName.message as string} />
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="lasttName">Last Name</Label>
            <Input
              type="text"
              placeholder="Enter your last name"
              className="text-sm"
              {...register("lastName")}
            />
            {errors.lastName && (
              <ErrorMessage errorMessage={errors.lastName.message as string} />
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="text-sm"
            placeholder="email@mail.com"
            {...register("email")}
          />
          {errors.email && (
            <ErrorMessage errorMessage={errors.email.message as string} />
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Create password"
                className="text-sm"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-0 cursor-pointer h-full"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <div>
                <p className="text-red-500 text-xs">Password must:</p>
                <ul className="list-disc pl-5 text-red-500 text-xs">
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
          <div className="w-full">
            <Label htmlFor="passwordConfirmation">Password</Label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                placeholder="Confirm your password"
                className="text-sm"
                type={showPasswordConfirmation ? "text" : "password"}
                {...register("passwordConfirmation")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                className="absolute right-2 top-0 cursor-pointer h-full"
              >
                {showPasswordConfirmation ? "🙈" : "👁️"}
              </button>
            </div>
            {!doPasswordsMatch && (
              <ErrorMessage errorMessage="Passwords do not match" />
            )}
          </div>
        </div>
      </div>

      {error && <ErrorMessage errorMessage={error} />}

      <Button
        aria-disabled={loading}
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-indigo-500 hover:bg-indigo-400 transition-colors duration-300"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner color="gray" size="sm" /> Please wait
          </span>
        ) : (
          "Create an account"
        )}
      </Button>
    </form>
  );
}
