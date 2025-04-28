import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
     bill_image:{
        type:String,
     },
     userid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
     },
     email:{
        type:String,
        unique:true
     },
     username:{
        type:String,
     },
     cent_Account:{
        type:Number,
     },
     billing_startdate:{
        type:Date,
     },
     billing_enddate:{
        type:Date,
     },
     total_profit:{
        type:Number
     },
     profit_sharing:{
        type:Number
     },
     ispaymentreceived:{
        type:Boolean
     },
     received_date:{
        type:Date
     }
},{timestamps:true});

export const Billing = mongoose.model("Billing",billingSchema);