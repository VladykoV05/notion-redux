import { z } from "zod"

export const RegisterSchema = z
  .object({
    email: z.string().email("Введите корректный email."),
    password: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов.")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву.")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву.")
      .regex(/\d/, "Пароль должен содержать хотя бы одну цифру."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  })

export const LoginSchema = z.object({
  email: z.string().email("Введите корректный email."),
  password: z.string(),
})
