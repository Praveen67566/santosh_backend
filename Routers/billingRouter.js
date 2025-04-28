import express from "express";
import { upload } from "../Common/multerConf.js";
import {
  createBilling,
  deleteCurrentUserBilling,
  getAllBillings,
  getCurrentUserBilling,
  updateCurrentUserBilling,
} from "../Controllers/billingController.js";

export const billingrouter = express.Router();

billingrouter.post("/billing", upload.single("bill_image"), createBilling);

billingrouter.get("/billing/:id", getCurrentUserBilling);

billingrouter.delete("/billing/:id", deleteCurrentUserBilling);

billingrouter.put(
  "/billing/:id",
  upload.single("bill_image"),
  updateCurrentUserBilling
);

billingrouter.get("/getallbilling", getAllBillings);
