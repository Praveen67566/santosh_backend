import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

        const { name, email, phone, city, password, gender } = req.body;

        if (!name || !email || !phone || !city || !password || !gender) {
            res.status(400).json({ message: "Credentails are required" });
        }

        const existinguser = await User.findOne({ email });

        if (existinguser) {
            res.status(400).json({ message: "user already exist" });
        }

        const user = await User.create({
            name,
            email,
            gender,
            phone,
            city,
            password
        })

        if (!user) {
            res.status(400).json({ message: "User Creation Failed" });
        }

        res.status(201).json({ message: "User Registered Successfully" })



    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        
        if(!email || !password){
            res.status(400).json({ message: "Credentails are required" });
        }

        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({ message: "Provide Correct Email" });
        }

        const isModified = user.verifyPassword(password);

        if(!isModified){
            res.status(400).json({ message: "Password Not Correct" });
        }

        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
            expiresIn:"1h",
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({message:"Login Successful",
            id:user._id,
            email:user.email
        });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error" });
    }
}