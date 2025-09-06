import { model, Schema } from "mongoose";
import { TransactionType } from "../enums/transactionType";

const TransactionSchema = new Schema(
  {
    type: TransactionType,
    customerId: { type: Schema.Types.ObjectId, require: false },
    vendorId: { type: Schema.Types.ObjectId, require: false },
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    totalAmount: Number,
    data: Date,
    businessId: String,
  },
  { timestamps: true },
);

export const Transaction = model("Transactions", TransactionSchema);
