import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: { type: String, require: false },
    price: Number,
    stock: { type: Number, default: 0 },
    catetory: String,
    businessId: String,
  },
  { timestamps: true },
);

export const Product = model("Products", ProductSchema);
