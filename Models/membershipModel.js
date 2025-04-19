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
    status:{
        type:String,
        enum:['Active','InActive'],
        default:'InActive'
    }
},{timestamps:true}) 

export const Membership = mongoose.model("Membership",membershipSchema);