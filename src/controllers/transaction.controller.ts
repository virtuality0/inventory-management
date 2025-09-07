import { NextFunction, Response, Request } from "express";
import {
  addTransaction,
  getAllTransactions,
} from "../services/transaction.service";

const GetAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await getAllTransactions(req.businessId ?? "");
    res.json({
      success: true,
      transaction: transaction,
    });
  } catch (err) {
    next(err);
  }
};

const Add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTransaction = await addTransaction(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction added successfully.",
      id: newTransaction._id,
    });
  } catch (err) {
    next(err);
  }
};

export { Add, GetAll };
