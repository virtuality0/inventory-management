import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: String,
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
    avatar: { type: String, required: false },
    businessId: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model("Users", userSchema);
