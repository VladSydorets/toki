import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="mt-6 w-full md:w-1/2">
        <div className="text-left sm:text-center mb-2">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-gray-500">
            Enter your email below to login to your account
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
