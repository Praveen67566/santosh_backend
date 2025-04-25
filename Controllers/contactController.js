import { Contact } from "../Models/contactModel.js";

// Add Contact
export const addcontact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });

    if (!contact) {
      return res.status(400).json({ message: "Failed to share details" });
    }

    res.status(201).json({ message: "Message Shared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Contacts
export const getallcontact = async (req, res) => {
  try {
    console.log("getallcontact API hit ✅");

    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log("Found contacts:", contacts);

    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error in getallcontact:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
