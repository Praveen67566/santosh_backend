import { Withdrawal } from "../Models/withdrawModel.js";

export const requestwithdrawal = async (req,res)=>{
     try {
        const {userid,amount,accountNo,ifsccode,upiId} = req.body;

        if(!userid||!amount ||!accountNo ||!ifsccode ||!upiId){
            res.status(400).json({message:"Fields are required.."});
        }

        const withdrawal = await Withdrawal.create({
            userid,
            amount,
            accountNo,
            ifsccode,
            upiId
        });

        if(!withdrawal){
           res.status(500).json({message:"Server Error"})
        }

        res.status(201).json({withdrawal});
     } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
     }
}