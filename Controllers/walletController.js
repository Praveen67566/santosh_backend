import { User } from "../Models/userModel.js";

export const addamount = async (req,res)=>{
     try{
        const {amount,email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({message:"User Not Found"});
        }

        if(!amount){
            res.status(400).json({message:"Amount is required"})
        }
        
        user.wallet += amount;

        await user.save();

        res.status(200).json({message:"Amount Added Successfully"});
        
     }catch(error){
        res.status(500).json({message:"Internal Server Error"});
     }
}