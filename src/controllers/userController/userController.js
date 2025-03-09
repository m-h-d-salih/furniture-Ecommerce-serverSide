import AppError from "../../middleware/appError.js";
import User from "../../models/userSchema/userSchema.js";

export const getUserProfile=async(req,res)=>{
   
    const id=req.params.id;
    const user=await User.findById(id)
    if(!user)throw new AppError(`user not found`,404)
    res.status(200).json({success:true,message:`user profile`,user:{
        id:user._id,
        name:user.name,
        email:user.email
    }})
}