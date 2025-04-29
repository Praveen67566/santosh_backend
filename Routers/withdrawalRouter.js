import express from "express";
import {requestwithdrawal,getallwithdrawal} from "../Controllers/withdrawalController.js"

export const withdrawalRouter = express.Router();

withdrawalRouter.post('/requestwithdrawal',requestwithdrawal);
withdrawalRouter.get('/getAllwithdrawal',getallwithdrawal);