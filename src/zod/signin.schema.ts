import { z } from "zod";

export const signinSchema = z.object({
  email: z.email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be atleast 8 character long and contain atleast 1 number, 1 letter and one special character",
    ),
});

export type signinDto = z.infer<typeof signinSchema>;
