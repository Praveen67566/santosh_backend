import express from "express"
import { addbrokerdetails, getAllbrokerdetails } from "../Controllers/brokerController";

export const brokerRouter = express.Router();

brokerRouter.get('/Allbroker',getAllbrokerdetails);
brokerRouter.post('/broker',addbrokerdetails);