import { z } from "zod";
import { UserType } from "../enums/userType";

export const updateContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "name should be longer than 1 characters" })
    .max(100, { message: "name should be less than 100 characters." })
    .optional(),
  email: z
    .email({ message: "Please provide a valid email address." })
    .optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Please provide a proper phone number" })
    .optional(),
  businessId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid businessId" }),
  type: z
    .enum(UserType, {
      message: "Contact can be either Vendor or Customer",
    })
    .optional(),
  address: z
    .string()
    .trim()
    .min(1, { message: "address should be longer than 1 characters" })
    .max(250, { message: "address should be less than 250 characters." })
    .optional(),
});

export type updateContactDto = z.infer<typeof updateContactSchema>;
