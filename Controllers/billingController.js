import { Billing } from "../Models/billingModel.js";

export const createBilling = async (req, res) => {
  try {
      const {userid,username, cent_Account, billing_startdate, billing_enddate, total_profit, profit_sharing, ispaymentreceived, received_date} = req.body;

      const bill_image = req.file.filename;

      if (!userid ||!username || !cent_Account || !billing_startdate || !billing_enddate || !total_profit || !profit_sharing || !ispaymentreceived || !received_date) {
        res.status(404).json({ message: "fields are required" })
      }

      const bill = await Billing.create({
        userid,
        username,
        cent_Account,
        billing_startdate,
        billing_enddate,
        total_profit,
        profit_sharing,
        ispaymentreceived,
        received_date,
        bill_image
      })

      if (!bill) {
        res.status(500).json({ message: "Internal Server Error" });
      }

      res.status(201).json({ bill });

    }
 catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUserBilling = async (req, res) => {
  try {
    const userId = req.params.userid || req.user?.id; // use req.user if auth middleware exists

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const billings = await Billing.find({ userid: userId }).sort({ createdAt: -1 });

    if (!billings || billings.length === 0) {
      return res.status(404).json({ message: "No billing records found for this user" });
    }

    res.status(200).json({ billings });
  } catch (error) {
    console.error("Get Billing Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
