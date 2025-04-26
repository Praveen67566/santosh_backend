import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../Config/sendmail.js";
import { emailSchema, resetPasswordSchema } from "../validation/validation.js";
import { Membership } from "../Models/membershipModel.js";
import crypto from "crypto";

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

    const referredCode = req.query.referralCode;
    // Get the referral code from the request
    console.log(referredCode);

    if (
      !fname || !lname || !email || !phone || !fullPhone ||
      !countryCode || !city || !password || !gender
    ) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Generate a unique referral code
    let referralCode;
    let codeExists = true;
    while (codeExists) {
      referralCode = crypto.randomBytes(3).toString("hex");
      const existingCode = await User.findOne({ referralCode });
      if (!existingCode) codeExists = false;
    }

    // Create new user instance
    const newUser = new User({
      fname,
      lname,
      email,
      gender,
      phone,
      city,
      password,
      fullPhone,
      countryCode,
      referredCode,
      referralCode,
    });

    // ✅ Apply benefit to referrer only once if referredCode is provided
    if (referredCode) {
      const referrer = await User.findOne({ referralCode: referredCode });
      const userid = referrer._id;
      const membership = await Membership.findOne({ userid });
      if (referrer && membership.status == 'Active') {
        if (referrer) {
          // Check if this new user is already in referrer's referral list
          const alreadyReferred = referrer.referrals.includes(newUser._id);
          if (!alreadyReferred) {
            referrer.wallet = (referrer.wallet || 0) + 350;
            referrer.referrals.push(newUser._id); // ✅ Track one-time referral
            await referrer.save();
          }
        }
      }

      await newUser.save();

      return res.status(201).json({ message: "User Registered Successfully" });

    }
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email is incorrect" });
    }

    const isCorrect = await user.verifyPassword(password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    const membership = await Membership.findOne({ userid: user._id });

    const userResponse = {
      id: user._id,
      email: user.email,
      role: user.role,
      fname: user.fname,
      lname: user.lname,
      referralCode: user.referralCode || null,
      referredCode: user.referredCode || null,
      wallet: user.wallet || 0,
    };

    if (membership) {
      return res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse,
        membership,
      });
    }

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getallUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
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
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const membership = await Membership.findOne({ userid: user._id });

    if (membership) {
      return res.status(200).json({ user, membership });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const getReferralLink = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Construct the referral link
    const referralLink = `${process.env.ClientUrl}/register?referralCode=${user.referralCode}`;

    res.status(200).json({
      message: "Referral link fetched successfully",
      referralLink,
    });
  } catch (error) {
    console.error("Error fetching referral link:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

