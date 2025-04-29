import express from "express";
import {requestwithdrawal} from "../Controllers/withdrawalController.js"

export const withdrawalRouter = express.Router();

withdrawalRouter.post('/requestwithdrawal',requestwithdrawal);