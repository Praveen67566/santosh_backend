import { Membership } from "../Models/membershipModel.js";
import { Payment } from "../Models/PaymentModel.js";
import { User } from "../Models/userModel.js";

export const activatemembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Membership ID and status are required." });
    }

    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found." });
    }

    if (membership.flag) {
      return res.status(400).json({ message: "Membership already processed." });
    }

    const payment = await Payment.findById(membership.payment);
    if (!payment) {
      return res
        .status(404)
        .json({ message: "Payment not found or not linked." });
    }

    // Update membership and payment
    membership.status = status;
    membership.flag = true;
    await membership.save();

    payment.status = status === "Active" ? "Paid" : "Unpaid";
    payment.onclick = true;
    await payment.save();

    // Handle referral bonus if activated
    if (status === "Active") {
      const user = await User.findById(membership.userid);
      if (user?.referredCode) {
        const refUser = await User.findOne({ referralCode: user.referredCode });
        if (refUser) {
          refUser.wallet = (refUser.wallet || 0) + 350;
          await refUser.save();
        }
      }
    }

    return res.status(200).json({
      message: `Membership ${status.toLowerCase()} successfully.`,
      payment,
      membership,
    });
  } catch (error) {
    console.error("ActivateMembership Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
