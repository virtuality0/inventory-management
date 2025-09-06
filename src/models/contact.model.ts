import { model, Schema } from "mongoose";
import { UserType } from "../enums/userType";

// customer or vendor schema
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "User with this email already exists."],
    },
    phone: {
      type: String,
      required: false,
      unique: [true, "User with this phone nuber already exists"],
      sparse: true,
    },
    address: { type: String, required: true },
    type: { type: String, enum: Object.values(UserType), required: true },
    businessId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Contact = model("Contacts", contactSchema);
