import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../Config/sendmail.js";
import { emailSchema, resetPasswordSchema } from "../validation/validation.js";

export const register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phone,
      city,
      countryCode,
      fullPhone,
      password,
      gender,
    } = req.body;

    if (
      !fname ||
      !lname ||
      !email ||
      !phone ||
      !fullPhone ||
      !countryCode ||
      !city ||
      !password ||
      !gender
    ) {
      res.status(400).json({ message: "Credentails are required" });
    }

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      res.status(400).json({ message: "user already exist" });
    }

    const user = await User.create({
      fname,
      lname,
      email,
      gender,
      phone,
      city,
      password,
      fullPhone,
      countryCode,
    });

    if (!user) {
      res.status(400).json({ message: "User Creation Failed" });
    }

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Credentails are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Provide Correct Email" });
    }

    const isModified = user.verifyPassword(password);

    if (!isModified) {
      res.status(400).json({ message: "Password Not Correct" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getallUser = async (req, res) => {
  try {
    const users = User.find({});

    if (!users) {
      res.status(400).json({ message: "Users are available" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgetPassword = async (req, res) => {
  const { error } = emailSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not registered" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.ClientUrl}/reset-password/${token}`;

    const subject = "Password Reset Request";
    const message = `You requested a password reset. Click here: ${resetUrl}`;
    await sendMail(email, subject, message);

    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Credentails are required" });
    }

    const user = User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

    if (user.role == "user") {
      res.status(400).json({ message: "Restricted to user" });
    }

    res.status(200).json({ message: "Admin login Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};