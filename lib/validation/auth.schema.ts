import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(11, "Phone number must be at least 11 digits")
    .max(11, "Phone number cannot exceed 11 digits")
    .regex(/^\d+$/, "Phone number can only contain digits")
    .regex(
      /^09\d{9}$/,
      "Phone number must start with 09 and be exactly 11 digits"
    ),
});

export type LoginValues = z.infer<typeof loginSchema>;
