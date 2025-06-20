import { Withdrawal } from "../Models/withdrawModel.js";
import { User } from "../Models/userModel.js";

export const requestwithdrawal = async (req, res) => {
  try {
    const { userid, amount, accountNo, ifsccode, upiId } = req.body;

    if (!userid) {
      res.status(400).json({ message: "UserId is required" });
    }

    const user = await User.findOne({ _id: userid });

    if (!user) {
    }
    const withdrawal = await Withdrawal.create({
      userid,
      amount,
      accountNo,
      ifsccode,
      upiId,
    });

    if (!withdrawal) {
      res.status(500).json({ message: "Server Error" });
    }

    res.status(201).json({ withdrawal });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getallwithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.find({});
    let users = [];

    for (let i = 0; i < withdrawal.length; i++) {
      const userid = withdrawal[i].userid;
      console.log(userid);
      const user = await User.findOne({ _id: userid });
      users.push(user);
    }
    res.status(201).json({ withdrawal, users });

    if (!users) {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletewithdrawal = async (req,res)=>{
  try{
     const {id} = req.params;

    const withdrawalobj = await Withdrawal.findOne({_id:id});
    console.log(withdrawalobj);
    const userid = withdrawalobj.userid;
    const amount = withdrawalobj.amount;

    const user = await User.findOne({_id:userid});

    user.wallet -= amount;

    user.save();

    const withdrawal = await Withdrawal.deleteOne({_id:id});

    if(!withdrawal){
      res.status(400).json({message:"withdrawal deletion not done yet"})
    }

    res.status(200).json({message:"Deleted Successfully"});
  }catch(error){
    res.status(500).json({message:"Internal Server Error"});
  }
}
