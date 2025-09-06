import { Router } from "express";
import { Add, Delete, GetAll, Update } from "../controllers/contact.controller";
import { auth } from "../middlewares/jwt.middleware";
import { verifySchema } from "../middlewares/zod.middleware";
import { updateProductSchema } from "../zod/update-product.schema";
import { addProductSchema } from "../zod/add-product.schema";

export const contactRouter = Router();

contactRouter.delete("/:id", auth, Delete);
contactRouter.put("/:id", auth, verifySchema(updateProductSchema), Update);
contactRouter.get("", auth, GetAll);
contactRouter.post("", auth, verifySchema(addProductSchema), Add);
