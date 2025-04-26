import express from "express";
import { activatemembership } from "../Controllers/membershipController.js";
// import { makePaymentFormembership } from "../Controllers/membershipController.js";

export const membershipRouter = express.Router();

membershipRouter.put("/activatemembership/:id", activatemembership);
