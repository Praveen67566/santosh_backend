import { Withdrawal } from "../Models/withdrawModel.js";
import { User } from "../Models/userModel.js";

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

export const getallwithdrawal = async (req,res)=>{
   try {
      const withdrawal = await Withdrawal.find({});
      let users = [];

      for (let i = 0; i < withdrawal.length; i++) {
        const userid = withdrawal[i].userid;

        const users = await User.findOne({userid});
         
      }
      res.status(201).json({withdrawal,users});

      if(!users){
         res.status(404).json({message:"No user found"});
      }
   } catch (error) {
     res.status(500).json({message:"Internal Server Error"});
   }
}