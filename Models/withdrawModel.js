import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number
    },
    accountNo:{
        type:String,
    },
    ifsccode:{
        type:String,
    },
    upiId:{
        type:String
    }
},{timestamps:true});

export const Withdrawal = mongoose.model("Withdrawal",withdrawalSchema);