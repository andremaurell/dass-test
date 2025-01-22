import { z } from "zod";

export const cpfSchema = z
  .string()
  .transform((cpf) => cpf.replace(/[^\d]/g, ""))
  .refine((cpf) => cpf.length === 11, {
    message: "CPF must be valid",
  });

// Validação do Nome
export const nameSchema = z
  .string()
  .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
  .min(3, "Name must have at least 3 characters");