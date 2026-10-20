import { z } from "zod";

export const userRoleEnum = z.enum(["student", "teacher", "admin"]);

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
  role: userRoleEnum.default("student"),
  adminPasscode: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(254),
  password: z.string().min(1, "Password is required").max(72),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(254),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(32, "Invalid or expired token"),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: userRoleEnum,
});
