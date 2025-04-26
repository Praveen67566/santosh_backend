import { Membership } from "../Models/membershipModel.js";
import { Payment } from "../Models/PaymentModel.js";

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});

    if (!payments) {
      res.status(400).json({ message: "Payments not found" });
    }

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

export const getAllPaymentsFormembership = async (req, res) => {
    try {
      const payments = await Payment.find({});

      const membership = await Membership.find({});
  
      if (!payments) {
        res.status(400).json({ message: "Payments not found" });
      }
  
      res.status(200).json({ payments,membership });
    } catch (error) {
      res.status(500).json({ message: "Internal Sever Error" });
    }
  };

export const makepaymentsformembership = async (req, res) => {
  try {
    const { utrNumber, userid } = req.body;

    if (!utrNumber || !userid) {
      return res.status(400).json({ message: "utrNumber and userid required" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const pay = await Payment.create({
      utrNumber,
      paymentScreenShot: fileUrl,
    });

    if (!pay) {
      return res.status(400).json({ message: "utrNumber and userid required" });
    }

    const membership = await Membership.create({
      userid,
      payment: pay._id,
    });

    const payment = await Payment.findOne({id:pay._id});

    payment.membershipid = membership._id;

    await payment.save();

    if (!membership) {
      res.status(400).json({ message: "membership not created" });
    }

    res.status(200).json({ pay, membership });
  } catch (error) {
    res.status(500).json({ message: "Some Internal Server Error" });
  }
};

export const makepayment = async (req, res) => {
  try {
    const { utrNumber, userid } = req.body;

    if (!utrNumber || !userid) {
      return res.status(400).json({ message: "utrNumber and userid required" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const pay = await Payment.create({
      userid: userid,
      utrNumber,
      paymentScreenShot: fileUrl,
    });

    if (!pay) {
      return res.status(400).json({ message: "utrNumber and userid required" });
    }
    res.status(200).json({ pay });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some Internal Server Error" });
  }
};

export const approvePayment = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
  
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
  
      if (payment.onclick) {
        return res.status(400).json({ message: "Action already performed" });
      }
  
      payment.status = "Paid";
      payment.onclick = true;
      await payment.save();
  
      res.status(200).json({ message: "Payment approved", payment });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const rejectPayment = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
  
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
  
      if (payment.onclick) {
        return res.status(400).json({ message: "Action already performed" });
      }
  
      payment.status = "Unpaid";
      payment.onclick = true;
      await payment.save();
  
      res.status(200).json({ message: "Payment rejected", payment });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };  
