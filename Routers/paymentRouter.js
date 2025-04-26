import express from "express";
import { upload } from "../Common/multerConf.js";
import {
  approvePayment,
  getAllPayments,
  makepayment,
  makepaymentsformembership,
  rejectPayment,
  getAllPaymentsFormembership
} from "../Controllers/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter.post(
  "/paymentformembership",
  upload.single("paymentScreenShot"),
  makepaymentsformembership
);

paymentRouter.patch("/approve/:id", approvePayment);
paymentRouter.patch("/reject/:id", rejectPayment);
paymentRouter.post("/payment", upload.single("paymentScreenShot"), makepayment);
paymentRouter.get("/payment", getAllPayments);
paymentRouter.get("/paymentformembership",getAllPaymentsFormembership);
