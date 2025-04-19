import { Payment } from "../Models/PaymentModel.js";

export const getAllPayments = async (req,res) =>{
    try {
       const payments = await Payment.find({});
       
       if(!payments){
        res.status(400).json({message:"Payments not found"})
       }

       res.status(200).json({payments});

    } catch (error) {
       res.status(500).json({message:"Internal Sever Error"}) 
    }
}

export const makepayments = async (req,res)=>{
    try {
        const {utrNumber} = req.body;
    console.log(utrNumber)
    } catch (error) {
        
    }
}