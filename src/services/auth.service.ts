import { signupDto } from "../zod/signup.schema";
import bcrypt from "bcrypt";
import { AppError } from "../errors/app.error";
import { signinDto } from "../zod/signin.schema";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const register = async (signupDto: signupDto) => {
  const existingUser = await User.findOne({
    email: signupDto.email,
  });

  if (existingUser) {
    throw new AppError("User with this email already exists.", 409);
  }

  const hashedPassword = await bcrypt.hash(signupDto.password, 10);

  const newUser = await User.create({
    email: signupDto.email,
    name: signupDto.name,
    password: hashedPassword,
    businessId: signupDto.businessId,
  });

  return newUser;
};

const login = async (signinDto: signinDto) => {
  const existingUser = await User.findOne({
    email: signinDto.email,
  });

  if (!existingUser) {
    throw new AppError("Invalid credentials.", 400);
  }

  const passwordsMatched = await bcrypt.compare(
    signinDto.password,
    existingUser.password ?? "",
  );

  if (!passwordsMatched) {
    throw new AppError("Invalid credentials.", 400);
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      businessId: existingUser.businessId,
    },
    process.env.JWT_SECRET ?? "secr3t",
  );

  return token;
};

export { register, login };
