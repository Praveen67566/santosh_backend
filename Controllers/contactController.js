import { Contact } from "../Models/contactModel.js"

export const addcontact = async (req,res)=>{
     try{
       const {name, email,message} = req.body;

       if(!name ||!email ||!message){
        res.status(400).json({message:"fields are required"})
       }

       const contact  = await Contact.create({
        name,
        email,
        message
       });

       if(!contact){
        res.status(400).json({message:"failed to share details"});

       }
       res.status(201).json({message:"Message Shared"});
     }catch(error){
        res.status(500).json({message:"Internal Sever Error"});
     }
}

export const getallcontact = async (req,res)=>{
    console.log("contact route hit ");
    try{
        const contacts = await Contact.find({}).sort({ createdAt: -1 });

        if(!contacts){
            res.status(400).json({message:"Contacts are not found"})
        }

        res.status(200).json({contacts});

    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

