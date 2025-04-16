import { Billing } from "../Models/billingModel.js";

// Create a new billing record
export const createBilling = async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    const savedBilling = await newBilling.save();
    res.status(201).json(savedBilling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all billing records
export const getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a billing record by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ error: "Billing not found" });
    res.status(200).json(billing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a billing record
export const updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBilling) return res.status(404).json({ error: "Billing not found" });
    res.status(200).json(updatedBilling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a billing record
export const deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling) return res.status(404).json({ error: "Billing not found" });
    res.status(200).json({ message: "Billing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
