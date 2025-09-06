import { Router } from "express";
import { auth } from "../middlewares/jwt.middleware";
import { Add, Delete, GetAll, Update } from "../controllers/product.controller";
import { verifySchema } from "../middlewares/zod.middleware";
import { updateProductSchema } from "../zod/update-product.schema";
import { addProductSchema } from "../zod/add-product.schema";

export const productRouter = Router();

productRouter.delete("/:id", auth, Delete);
productRouter.put("/:id", auth, verifySchema(updateProductSchema), Update);
productRouter.get("", auth, GetAll);
productRouter.post("", auth, verifySchema(addProductSchema), Add);
