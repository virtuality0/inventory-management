import { Router } from "express";
import { auth } from "../middlewares/jwt.middleware";
import { GetInventory } from "../controllers/reports.controller";

export const reportRouter = Router();

reportRouter.get("/inventory", auth, GetInventory);
// transactionRouter.get("/transactions", auth, GetTransactions);
