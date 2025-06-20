import { User } from "../Models/userModel.js";
import {Membership} from "../Models/membershipModel.js"

export const referraldetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }

    let referredUsers = [];
    let membershipAll = [];

    if (user.referrals.length > 0) {
      const ref = user.referrals;

      for (let i = 0; i < ref.length; i++) {
        const id = ref[i];

        let refuser = await User.findOne({ _id: id });
        const membership = await Membership.findOne({userid:id});
        referredUsers.push(refuser);
        membershipAll.push(membership);
      }

      return res.status(200).json({ referredUsers,membershipAll});
    }

    res.status(200).json({ message: "No Referrals are found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Srever Error" });
  }
};

