import { Billing } from "../Models/billingModel.js";

// Create a new billing record
export const createBilling = async (req, res) => {
  try {
    const newBilling = new Billing({
      ...req.body,
      userid: req.user._id, // Link billing to the logged-in user
    });
    const savedBilling = await newBilling.save();
    res.status(201).json(savedBilling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all billing records for the logged-in user
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find({ userid: req.user._id });
    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a billing record by ID (only if it belongs to the user)
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findOne({
      _id: req.params.id,
      userid: req.user._id,
    });
    if (!billing) return res.status(404).json({ error: "Billing not found" });
    res.status(200).json(billing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a billing record (only if it belongs to the user)
export const updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findOneAndUpdate(
      { _id: req.params.id, userid: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBilling) return res.status(404).json({ error: "Billing not found or unauthorized" });
    res.status(200).json(updatedBilling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a billing record (only if it belongs to the user)
export const deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findOneAndDelete({
      _id: req.params.id,
      userid: req.user._id,
    });
    if (!deletedBilling) return res.status(404).json({ error: "Billing not found or unauthorized" });
    res.status(200).json({ message: "Billing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
