import { Router } from "express";
import { Add, GetAll } from "../controllers/transaction.controller";
import { verifySchema } from "../middlewares/zod.middleware";
import { auth } from "../middlewares/jwt.middleware";
import { addTransactionSchema } from "../zod/add-transaction.schema";

export const transactionRouter = Router();

transactionRouter.get("", auth, GetAll);
transactionRouter.post("", auth, verifySchema(addTransactionSchema), Add);
