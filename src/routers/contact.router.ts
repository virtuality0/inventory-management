import { Router } from "express";
import { Add, Delete, GetAll, Update } from "../controllers/contact.controller";
import { auth } from "../middlewares/jwt.middleware";

export const contactRouter = Router();

contactRouter.delete("/:id", auth, Delete);
contactRouter.put("/:id", auth, Update);
contactRouter.get("", auth, GetAll);
contactRouter.post("", auth, Add);
