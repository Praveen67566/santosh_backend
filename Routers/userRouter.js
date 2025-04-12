import express from "express"
import { register,login, getCurrentUser } from "../Controllers/userController.js";

export const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/user',getCurrentUser);