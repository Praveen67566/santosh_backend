import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({

    userid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    refid:{
        type:String,
        required:true,
    }
},{timestamps:true}) 

export const Membership = mongoose.model("Membership",membershipSchema);