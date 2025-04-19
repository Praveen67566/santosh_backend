import express from "express"
import { upload } from "../Common/multerConf.js";
import { makepayments } from "../Controllers/paymentController";

export const paymentRouter = express.Router();

paymentRouter.post('/payment',upload.single("file"),makepayments);