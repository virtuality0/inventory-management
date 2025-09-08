import express from "express";
import env from "dotenv";
import { authRouter } from "./routers/auth.router";
import { contactRouter } from "./routers/contact.router";
import { globalErrorHandler } from "./middlewares/errorhandling.middleware";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { productRouter } from "./routers/product.router";
import { transactionRouter } from "./routers/transactions.router";
import { reportRouter } from "./routers/report.router";

env.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/contacts", contactRouter);
app.use("/products", productRouter);
app.use("/transactions", transactionRouter);
app.use("/reports", reportRouter);
app.use(globalErrorHandler);

app.get("/", (_, res) => {
  res.json({
    message: "Server running properly.",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "");
    app.listen(process.env.PORT, () => {
      console.info(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

startServer();
