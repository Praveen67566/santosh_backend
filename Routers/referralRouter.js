import express from "express";
import { referraldetails } from "../Controllers/referralController.js";

export const referralRouter = express.Router();

referralRouter.get("/referral-users/:id", referraldetails);
