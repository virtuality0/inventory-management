import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "name should be longer than 1 characters" })
    .max(100, { message: "name should be less than 100 characters." }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be atleast 8 character long and contain atleast 1 number, 1 letter and one special character",
    ),
  email: z.email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Please provide a proper phone number" })
    .optional(),
  businessId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid businessId" }),
});

export type signupDto = z.infer<typeof signupSchema>;
