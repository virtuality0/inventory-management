import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  const statusCode = (err instanceof AppError && err.statusCode) || 500;
  const errorMessage = err.message || "Internal Server Error.";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
