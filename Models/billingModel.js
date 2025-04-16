import mongoose from "mongoose";
import { profitsecSchema } from "./billingModels/profitsec.js";
import { tobepaidsecSchema } from "./billingModels/tobepaid.js";
import { settlementSchema } from "./billingModels/settlementsec.js";

const billingSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    profitsec:profitsecSchema,
    tobepaidsec:tobepaidsecSchema,
    settlementsec:settlementSchema
},{timestamps:true});

export const Billing = mongoose.model("Billing",billingSchema);


