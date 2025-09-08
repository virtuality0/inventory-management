import { Request, Response, NextFunction } from "express";
import { getInventory } from "../services/report.service";

const GetInventory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inventory = await getInventory(req.businessId ?? "");
    res.json({
      success: true,
      inventory: inventory,
    });
  } catch (err) {
    next(err);
  }
};

export { GetInventory };
