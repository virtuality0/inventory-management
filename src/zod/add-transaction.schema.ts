import z from "zod";
import { TransactionType } from "../enums/transactionType";

export const addTransactionSchema = z.object({
  businessId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid businessId" }),

  customerId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid customerId" })
    .optional(),

  vendorId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid vendorId" })
    .optional(),
  type: z.enum(TransactionType, {
    message: "Transaction type can be either Sale or Purchase.",
  }),

  products: z.array(
    z.object({
      product: z
        .string()
        .trim()
        .min(1, { message: "Please enter a valid businessId" }),
      quantity: z.number().min(1),
    }),
  ),
});

export type addTransactionDto = z.infer<typeof addTransactionSchema>;
