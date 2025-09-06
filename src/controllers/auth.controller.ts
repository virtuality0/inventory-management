import { Response, Request, NextFunction, CookieOptions } from "express";
import { signupDto } from "../zod/signup.schema";
import { register, login } from "../services/auth.service";
import { signinDto } from "../zod/signin.schema";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signupDto: signupDto = req.body;
    const user = await register(signupDto);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signinDto: signinDto = req.body;
    const token = await login(signinDto);

    const cookieOptions: CookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("Authorization", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User signin successfull",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const Logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("Authorization", null);
    res.status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch (err) {
    next(err);
  }
};

export { Register, Login, Logout };
