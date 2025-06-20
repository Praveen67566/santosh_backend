import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    utrNumber: {
      type: String,
      required: true,
    },
    paymentScreenShot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Pending"],
      default: "Unpaid",
    },
    membershipid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
      sparse: true,
    },
    onclick: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
