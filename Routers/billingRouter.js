import express from "express";
import { upload } from "../Common/multerConf.js";
import {createBilling,deleteCurrentUserBilling,getCurrentUserBilling, updateCurrentUserBilling} from "../Controllers/billingController.js"

export const billingrouter = express.Router();

billingrouter.post('/billing',upload.single("bill_image"),createBilling);
billingrouter.get('/billing/:id',getCurrentUserBilling);
billingrouter.delete('/billing',deleteCurrentUserBilling);
billingrouter.put('/billing/:id',updateCurrentUserBilling);