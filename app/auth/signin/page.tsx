// "use client";

// import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
// import { useState, FormEvent } from "react";

// export default function SignInForm() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleCredentialsLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await signIn("credentials", {
//         email: email,
//         password: password,
//         redirect: true,
//         callbackUrl: "/",
//       });

//       if (response?.error) {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProviderSignIn = async (provider: string) => {
//     setLoading(true);
//     try {
//       const response = await signIn(provider, {
//         callbackUrl: "/",
//         redirect: true,
//       });
//       if (response?.error) {
//         setError("Login failed. Try with a different account.");
//       }
//     } catch (error) {
//       console.error(error);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex-1">
//       <form onSubmit={handleCredentialsLogin} className="space-y-4">
//         <input
//           name="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           name="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <Button type="submit" disabled={loading}>
//           {loading ? "Signing in..." : "Sign in"}
//         </Button>
//       </form>

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       <div className="mt-4">
//         <span className="text-gray-500">Or</span>
//       </div>

//       <Button
//         disabled={loading}
//         variant="outline"
//         onClick={() => handleProviderSignIn("google")}
//         color="indigo"
//         className="mt-4"
//       >
//         <span>Sign in with Google</span>
//       </Button>
//       <Button
//         disabled={loading}
//         variant="outline"
//         onClick={() => handleProviderSignIn("github")}
//         color="indigo"
//         className="mt-4"
//       >
//         <span>Sign in with GitHub</span>
//       </Button>
//     </div>
//   );
// }

import { LoginForm } from "./form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
