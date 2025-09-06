import { Router } from "express";
import { Register, Login, Logout } from "../controllers/auth.controller";
import { verifySchema } from "../middlewares/zod.middleware";
import { signupSchema } from "../zod/signup.schema";
import { signinSchema } from "../zod/signin.schema";
import { auth } from "../middlewares/jwt.middleware";

export const authRouter = Router();

authRouter.post("/register", verifySchema(signupSchema), Register);
authRouter.post("/login", verifySchema(signinSchema), Login);
authRouter.get("/logout", auth, Logout);
