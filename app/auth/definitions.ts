import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .nonempty("Email is required."),
  password: z
    .string()
    .min(1, { message: "Password field must not be empty." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .nonempty("Email is required."),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
