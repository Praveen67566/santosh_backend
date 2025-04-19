import express from "express";
import { makePaymentFormembership } from "../Controllers/membershipController";

export const membershipRouter = express.Router();

membershipRouter.post('/membership',makePaymentFormembership);