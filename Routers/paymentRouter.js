import express from "express"
import { upload } from "../Common/multerConf.js";
import { approvePayment, getAllPayments, makepayment, makepaymentsformembership, rejectPayment } from "../Controllers/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter.post('/paymentformembership',upload.single("file"),makepaymentsformembership);
paymentRouter.patch('/approve/:id', approvePayment);
paymentRouter.patch('/reject/:id', rejectPayment);
paymentRouter.post('/payment',makepayment);
paymentRouter.get('/payment',getAllPayments);