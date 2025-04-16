import express from "express";
import {
  createBilling,
  getAllBillings,
  getBillingById,
  updateBilling,
  deleteBilling,
} from "../Controllers/billingController.js"

export const billingrouter = express.Router();

billingrouter.post("/", createBilling);
billingrouter.get("/", getAllBillings);
billingrouter.get("/:id", getBillingById);
billingrouter.put("/:id", updateBilling);
billingrouter.delete("/:id", deleteBilling);

