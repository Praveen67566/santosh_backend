import { Broker } from "../Models/brokerModel.js";

export const addbrokerdetails = async (req,res)=>{
    try {
        const {emailid,brokerName,loginid,password,serverName} = req.body;

        if(!emailid || !brokerName ||!loginid ||!password ||!serverName){
            res.status(400).json({message:"All fields are Required"})
        }

        const broker = await Broker.create({
            emailid,
            brokerName,
            loginid,
            password,
            serverName
        });

        if(!broker){
            res.status(400).json({message:"Broker Account Not created"});
        }

        res.status(201).json({message:"Broker id created"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getAllbrokerdetails = async (req,res)=>{
    try {
        const broker = await Broker.find({});

        if(!broker){
            res.status(200).json({message:"No Broker Found"});
        }

        res.status(200).json({broker});

    } catch (error) {
       res.status(500).json({message:"Internal Server Error"}) 
    }
}