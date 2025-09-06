import { Request, NextFunction, Response } from "express";
import { z, ZodError } from "zod";

export const verifySchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => {
          return {
            message: `${issue.path.join(".")} : ${issue.message}`,
          };
        });

        res.status(400).json({
          success: false,
          error: errors,
        });
      } else {
        res.status(500).json({
          error: "Something went wrong!",
        });
      }
    }
  };
};
