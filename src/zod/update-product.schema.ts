import z from "zod";

export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Invalid product name" })
    .optional(),
  description: z
    .string()
    .trim()
    .min(1, { message: "Invalid description" })
    .optional(),
  price: z.number({ message: "Invalid price value" }).optional(),
  businessId: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid businessId" })
    .optional(),
  category: z
    .string()
    .trim()
    .min(1, { message: "Invalid product category" })
    .optional(),
  stock: z.number().min(1, { message: "Invalid operation" }).optional(),
});

export type updateProductDto = z.infer<typeof updateProductSchema>;
