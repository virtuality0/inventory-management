import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/app.error";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.Authorization ?? "";
  try {
    if (!token) {
      throw new AppError("Not logged in.", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "secr3t",
    ) as JwtPayload;

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.businessId = decoded.businessId;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
