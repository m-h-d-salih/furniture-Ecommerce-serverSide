import mongoose from "mongoose"
import User from "../../../models/userSchema/userSchema.js"

export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        if(!users) return res.status(404).json({success:true,message:`no user found`,data:[]})
        else return res.status(200).json({success:true,data:users})
    } catch(error){
        return res.status(500).json({success:false,message:`internal server ${error.message}`})
      
    }
}

export const getUserById=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`please provide a valid user id`})
        const user=await User.findById(userId)
        if(!user) return res.status(404).json({success:true,message:`no user found`})
        else return res.status(200).json({success:true,data:user})
    }catch(error){
        return res.status(500).json({success:false,message:`internal server ${error.message}`})
      
    }
}
export const blockAndUnblockUser=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`please provide a valid user id`})
        const user=await User.findById(userId)
        if(!user) return res.status(404).json({success:true,message:`no user found`})
        user.isBlocked=!user.isBlocked;
        await user.save()
        const action=user.isBlocked?"is blocked":"is unblocked";     
         return res.status(200).json({success:true, message:`user ${action}`,data:user})
    }catch(error){
        return res.status(500).json({success:false,message:`internal server ${error.message}`})
      
    }

}