import { z } from "zod";

export const UserInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name cannot be empty" })
    .optional()
    .refine((val) => !val || /^[a-zA-Z\s-]+$/.test(val), {
      message: "First name must contain only letters, spaces, or hyphens",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name cannot be empty" })
    .optional()
    .refine((val) => !val || /^[a-zA-Z\s-]+$/.test(val), {
      message: "Last name must contain only letters, spaces, or hyphens",
    }),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
});

export const PasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Password field must not be empty" })
    .min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim(),
  repeatNewPassword: z.string().optional(),
});
