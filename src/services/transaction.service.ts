import mongoose from "mongoose";
import { Transaction } from "../models/transaction.model";
import { addTransactionDto } from "../zod/add-transaction.schema";
import { Product } from "../models/product.model";

const addTransaction = async (addTransactionDto: addTransactionDto) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productIds = addTransactionDto.products.reduce((acc, curr) => {
      if (acc.get(curr.product)) {
        return acc;
      } else {
        acc.set(curr.product, curr.quantity);
        return acc;
      }
    }, new Map<string, number>());

    const products = await Product.find({
      _id: { $in: Array.from(productIds.keys()) },
    });

    const totalAmount = products.reduce((acc, curr) => {
      const quantity = productIds.get(curr._id.toString());
      if (quantity === undefined) {
        return acc;
      } else {
        acc = acc + quantity * (curr.price ?? 0);
        return acc;
      }
    }, 0.0);

    const newTransaction = await Transaction.create(
      [
        {
          businessId: addTransactionDto.businessId,
          vendorId: addTransactionDto.vendorId,
          customerId: addTransactionDto.customerId,
          type: addTransactionDto.type,
          totalAmount: totalAmount,
          products: addTransactionDto.products,
        },
      ],
      { session },
    );

    // update stock of product
    // Preparing bulk operations for product stock update
    const operations = addTransactionDto.products.map((product) => ({
      updateOne: {
        filter: { _id: product.product },
        update: {
          $inc: {
            stock:
              addTransactionDto.type === "Purchase"
                ? product.quantity
                : -product.quantity,
          },
        },
      },
    }));

    await Product.bulkWrite(operations, { session });
    await session.commitTransaction();
    return newTransaction[0];
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getAllTransactions = async (businessId: string) => {
  const products = await Transaction.find({
    businessId: businessId,
  })
    .select({
      type: 1,
      customerId: 1,
      vendorId: 1,
      totalAmount: 1,
      businessId: 1,
      data: 1,
    })
    .populate("products.product")
    .populate("products.quantity")
    .exec();

  return products;
};
export { getAllTransactions, addTransaction };
