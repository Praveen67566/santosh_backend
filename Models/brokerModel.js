import mongoose from "mongoose"

const brokerSchema = new mongoose.Schema({
    emailid:{
        type:String,
    },
    brokerName:{
        type:String,
    },
    loginid:{
        type:String,
    },
    password:{
        type:String,
    },
    serverName:{
        type:String
    },
},{
    timestamps:true
})

export const Broker = mongoose.model("Broker",brokerSchema);