import express from "express";
import { addcontact, getallcontact } from "../Controllers/contactController.js";

export const contactRouter = express.Router();

contactRouter.get("/contact", getallcontact);

contactRouter.post("/contact", addcontact);
