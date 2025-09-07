import { model, Schema } from "mongoose";
import { TransactionType } from "../enums/transactionType";

const TransactionSchema = new Schema({
  type: { type: String, enum: TransactionType },
  customerId: { type: Schema.Types.ObjectId, require: false },
  vendorId: { type: Schema.Types.ObjectId, require: false },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now() },
  businessId: String,
});

export const Transaction = model("Transactions", TransactionSchema);
