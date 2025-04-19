import { Membership } from "../Models/membershipModel.js";
import { Payment } from "../Models/PaymentModel.js";

export const activatemembership = async (req,res)=>{
    try {
       const id = req.params;
       const {status} = req.body;

       if(!id || !status){
        res.status(400).json({message:"id and status are required"})
       }
       
       const updatedMembership = await Membership.findByIdAndUpdate(
        id, // just the ID, no object wrapper
        { status: "Active" },
        { new: true } // returns the updated document
      );

      if(!updatedMembership){
        res.status(400).json({message:"Unable to update membership"})
      }
      
      const paymentid = updatedMembership.payment;

      if(!paymentid){
        res.status(400).json({message:"payment not done yet"});
      }
      

      const pay = Payment.findByIdAndUpdate(paymentid,
        {status:'Paid'},
        {new:true}
      )

      if(!pay){
        res.status(400).json({message:"unable to change status"});
      }

      res.status(200).json({message:"Membership activated successfully",pay,updatedMembership});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}