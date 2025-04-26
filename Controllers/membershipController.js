// membershipController.js
import { Membership } from "../Models/membershipModel.js";
import { Payment } from "../Models/PaymentModel.js";

export const activatemembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id);

    if (!id || !status) {
      return res.status(400).json({ message: "id and status are required" });
    }

    // Correct: Find by _id
    const updatedMembership = await Membership.findById(id);

    if (!updatedMembership) {
      return res.status(400).json({ message: "Unable to find membership" });
    }

    updatedMembership.status = status;
    await updatedMembership.save();

    const paymentId = updatedMembership.payment;

    if (!paymentId) {
      return res.status(400).json({ message: "Payment not found" });
    }

    const pay = await Payment.findByIdAndUpdate(
      paymentId,
      { status: status === "Active" ? "Paid" : "Unpaid" },
      { new: true }
    );

    if (!pay) {
      return res
        .status(400)
        .json({ message: "Unable to change payment status" });
    }

    res.status(200).json({
      message: `Membership ${status.toLowerCase()} successfully`,
      pay,
      updatedMembership,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
