import mongoose from "mongoose";
export const profitsecSchema = new mongoose.Schema({
    week:{
        type:String,
        required:true,
    },
    totalammount:{
        type:Number,
        required:true,
    },
    profit:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['paid','unpaid'],
        default:'unpaid'
    }
},{timestapms:true});