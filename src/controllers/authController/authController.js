import signupvalidation from "../../middleware/joiValidation/signValidation.js";
import User from "../../models/userSchema/userSchema.js";
import { comparepassword, hashPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";
export const signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        // console.log(req.body)
        const existuser=await User.findOne({email})
        if(existuser)return res.status(400).json({success:false,message:`email laready exist`})
        const validateuser=await signupvalidation.validateAsync({
    name,email,password
    })
    const hashedPassword=await hashPassword(password)
    const newUser=new User({
        name:validateuser.name,
        email:validateuser.email,
        password:hashedPassword,
        role:role || "user"

    })
    await newUser.save()
    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: newUser,
      });
    }
    
    catch(error){
        return res.status(404).json({success:false,message:`bad request ${error.message}`})
      
    }
}
export const login=async(req,res)=>{
    // console.log(`user login`)
    try{
        // console.log(`user login`)
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user) return res.status(404).json({success:false,message:`no user found ,please create an account`})
        if(user.isBlocked) return res.status(400).json({success:false,message:`sorry user is temporarly blocked`})
        const validateuser=await comparepassword(password,user.password)
        if(!validateuser) return res.status(404).json({success:false,message:`inncorrect username/password `})
        const token=generateToken(user.id)
    if(user.role==="admin")
        return res.status(200).json({success:true,message:`welcome admin`,data:user,token })
     else   
         return res.status(200).json({success:true,message:`user login successfully`,data:user,token})
    }
    catch(err){
        return res.status(404).json({success:false,message:`bad request ${err.message}`})
    }
}
export const logout=async(req,res)=>{
    try{
        // console.log(`user logout`)
        res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
        res.status(200).json({success:true,message:'user logout successfully'})
    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
    }
}