import express from "express";
import { protect } from "../Middleware/authmiddleware.js";
import {
  register,
  login,
  getCurrentUser,
  forgetPassword,
  resetPassword,
  getallUser,
} from "../Controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/user", getCurrentUser);
userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/users",protect,getallUser);
