import z from "zod";

export const addProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Invalid product name" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Invalid description" })
    .optional(),
  price: z.number({ message: "Invalid price value" }),
  businessId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid businessId" }),
  category: z.string().trim().min(1, { message: "Invalid product category" }),
});

export type addProductDto = z.infer<typeof addProductSchema>;
