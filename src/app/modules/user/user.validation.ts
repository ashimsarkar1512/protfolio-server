// import z from 'zod';

// const createUserValidation = z.object({
//     name: z.string({ required_error: "User Name is Required" }),
//     email: z.string({ required_error: "User email is required" }),
//     password: z.string({ required_error: "Password is required" }),
//     role: z.enum(["user"]).default("user"),
// })
// const loginUserValidation = z.object({
//     email: z.string({ required_error: "User email is required" }),
//     password: z.string({ required_error: "Password is required" }),
// })


// // export validation
// export const userValidations = {
//     createUserValidation,
//     loginUserValidation
// }


import { z } from "zod";

const createUserValidation = z.object({
  name: z.string().min(1, "User Name is Required"),
  email: z
    .string()
    .min(1, "User email is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["user"]).default("user"),
});

const loginUserValidation = z.object({
  email: z
    .string()
    .min(1, "User email is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// export validation
export const userValidations = {
  createUserValidation,
  loginUserValidation,
};
