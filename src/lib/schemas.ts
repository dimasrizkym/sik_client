import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z
    .string()
    .min(6, { message: "Password minimal harus 6 karakter." }),
});

// Register Schema
export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Nama minimal harus 3 karakter." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    password: z
      .string()
      .min(6, { message: "Password minimal harus 6 karakter." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
