import mongoose from "mongoose";
export const tobepaidsecSchema = new mongoose.Schema({
    week:{
        type:String,
        required:true
    },
    profitAmount:{
        type:Number,
        required:true,
    },
    profitShare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true});