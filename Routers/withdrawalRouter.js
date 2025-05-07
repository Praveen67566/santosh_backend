import express from "express";
import {requestwithdrawal,getallwithdrawal, deletewithdrawal} from "../Controllers/withdrawalController.js"

export const withdrawalRouter = express.Router();

withdrawalRouter.post('/requestwithdrawal',requestwithdrawal);
withdrawalRouter.get('/getAllwithdrawal',getallwithdrawal);

withdrawalRouter.delete('/deletewithdrawal/:id',deletewithdrawal);