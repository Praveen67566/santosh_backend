// membershipController.js
import { Membership } from "../Models/membershipModel.js";
import { Payment } from "../Models/PaymentModel.js";

export const activatemembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "id and status are required" });
    }

    const updatedMembership = await Membership.findById(id);

    if (!updatedMembership) {
      return res.status(400).json({ message: "Unable to find membership" });
    }

    if (updatedMembership.flag) {
      return res.status(400).json({ message: "Membership already processed" });
    }

    const paymentId = updatedMembership.payment;

    if (!paymentId) {
      return res.status(400).json({ message: "Payment not linked to membership" });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(400).json({ message: "Payment not found" });
    }
    

    // Update membership status and set flag
    updatedMembership.status = status;
    updatedMembership.flag = true;
    await updatedMembership.save();

    // Optionally update payment status as well
    payment.status = status === "Active" ? "Paid" : "Unpaid";
    payment.onclick = true;
    await payment.save();

    res.status(200).json({
      message: `Membership ${status.toLowerCase()} successfully`,
      pay: payment,
      updatedMembership,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

ahdhdj;