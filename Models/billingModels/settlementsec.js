import mongoose from "mongoose";
export const settlementSchema = new mongoose.Schema({
  week:{
    type:String,
    required:true
  },
  billing:{
    type:Number,
    required:true
  },
  profit:{
    type:Number,
    required:true
  },
  paidstatus:{
    type:String,
    enum:['paid','unpaid'],
    default:'unpaid'
  },
  settledOn:{
    type:Date,
    required:true
  }

},{timestamps:true});