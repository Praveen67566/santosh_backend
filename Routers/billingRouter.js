import express from "express";
import { upload } from "../Common/multerConf.js";
import {createBilling,getCurrentUserBilling} from "../Controllers/billingController.js"

export const billingrouter = express.Router();

billingrouter.post('/billing',upload.single("bill_image"),createBilling);
billingrouter.get('/billing/:id',getCurrentUserBilling);