import Link from "next/link";

import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="mt-6 w-full md:w-3/4">
        <div className="text-left sm:text-center mb-2">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
