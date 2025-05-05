import express from "express";
import {
  createBilling,
  deleteCurrentUserBilling,
  getAllBillings,
  getCurrentUserBilling,
  updateCurrentUserBilling,
} from "../Controllers/billingController.js";

export const billingrouter = express.Router();

billingrouter.post("/billing", createBilling);

billingrouter.get("/billing/:id", getCurrentUserBilling);

billingrouter.delete("/billing/:id", deleteCurrentUserBilling);

billingrouter.put("/billing/:id", updateCurrentUserBilling);

billingrouter.get("/getallbilling", getAllBillings);
