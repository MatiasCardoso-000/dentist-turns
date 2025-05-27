import { string, z } from "zod";

export const registerSchema = z.object({
  email: string({ required_error: "El email es obligatorio" }).email(),
  password: string({required_error:"Debe ingresar una clave"})
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres")
    .refine(
      (password) => /[a-záéíóúñA-ZÁÉÍÓÚÑ]/.test(password),
      "La contraseña debe contener al menos una letra"
    )
    .refine(
      (password) => /\d/.test(password),
      "La contraseña debe contener al menos un número"
    )
    .refine(
      (password) => /[A-ZÁÉÍÓÚÑ]/.test(password),
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .refine(
      (password) => /[a-záéíóúñ]/.test(password),
      "La contraseña debe contener al menos una letra minúscula"
    )
    .refine(
      (password) => /^[a-záéíóúñA-ZÁÉÍÓÚÑ\d@$!%*?&._\-]+$/.test(password),
      "La contraseña solo puede contener letras, números, y los caracteres especiales: @$!%*?&._-"
    ),
  username: string({
    required_error: "El nombre de usuario es obligatorio",
  }).min(4, { message: "Mínimo 4 caracteres" }),
});

export const loginSchema = z.object({
  email: string({ required_error: "El email es obligatorio" }).email(),
  password: string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
