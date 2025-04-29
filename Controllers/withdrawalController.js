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
