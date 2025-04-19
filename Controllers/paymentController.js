import { Membership } from "../Models/membershipModel.js";
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

export const makepaymentsformembership = async (req,res)=>{
    try {
        const {utrNumber,userid} = req.body;

        if(!utrNumber || !userid){
            return res.status(400).json({message:"utrNumber and userid required"})
        }
        
        const pay = await Payment.create({
            utrNumber,
            paymentScreenShot:req.file.filename,
        })

        if(!pay){
            return res.status(400).json({message:"utrNumber and userid required"});
        }
        
        const membership = await Membership.create({
            userid,
            payment:pay._id
        })

        if(!membership){
            res.status(400).json({message:"membership not created"})
        }

        res.status(200).json({pay,membership})

    } catch (error) {
        res.status(500).json({message:"Some Internal Server Error"});
    }
}

