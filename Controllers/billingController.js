import { Billing } from "../Models/billingModel.js";
import { User } from "../Models/userModel.js";

export const createBilling = async (req, res) => {
  try {
    const {
      email,
      name,
      cent_Account,
      billing_startdate,
      billing_enddate,
      total_profit,
      profit_sharing,
      ispaymentreceived,
      received_date,
      contact
    } = req.body;

    if (
      !email ||
      !billing_startdate ||
      !billing_enddate ||
      !total_profit ||
      !profit_sharing
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found || incorrect email" });
    }

    const bill = await Billing.create({
      userid: user._id,
      email,
      name,
      cent_Account,
      billing_startdate,
      billing_enddate,
      total_profit,
      profit_sharing,
      ispaymentreceived,
      received_date,
      contact
    });

    res.status(201).json({ bill });
  } catch (error) {
    console.log("Billing Create Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUserBilling = async (req, res) => {
  try {
    // const userId = req.params.userid || req.user?.id;
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const billings = await Billing.find({ userid: userId }).sort({
      createdAt: -1,
    });

    if (!billings || billings.length === 0) {
      return res
        .status(404)
        .json({ message: "No billing records found for this user" });
    }

    res.status(200).json({ billings });
  } catch (error) {
    console.error("Get Billing Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCurrentUserBilling = async (req, res) => {
  try {
    const billid = req.params.id;

    if (!billid) {
      return res.status(400).json({ message: "bill id is required" });
    }

    const isdeleted = await Billing.findOneAndDelete({ _id: billid });

    if (!isdeleted) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.status(200).json({ message: "bill is deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCurrentUserBilling = async (req, res) => {
  try {
    const billid = req.params.id;

    if (!billid) {
      return res.status(400).json({ message: "Bill ID is required" });
    }

    // Destructure allowed fields
    const {
      name,
      cent_Account,
      billing_startdate,
      billing_enddate,
      total_profit,
      profit_sharing,
      ispaymentreceived,
      received_date,
      contact
      // email is not extracted to prevent update
    } = req.body;

    // Prepare update object
    const updateData = {
      name,
      cent_Account,
      billing_startdate,
      billing_enddate,
      total_profit,
      profit_sharing,
      ispaymentreceived,
      received_date,
      contact
    };

    // Perform the update
    const isupdated = await Billing.findOneAndUpdate(
      { _id: billid },
      updateData,
      { new: true }
    );

    if (!isupdated) {
      return res
        .status(404)
        .json({ message: "Bill not found or update failed" });
    }

    res.status(200).json({ message: "Bill is updated", bill: isupdated });
  } catch (error) {
    console.error("Update Billing Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find({}).sort({ createdAt: -1 });

    if (!billings) {
      return res.status(200).json({ message: "No billings found", billings });
    }

    res.status(200).json({ billings });
  } catch (error) {
    console.error("Get All Billings Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
