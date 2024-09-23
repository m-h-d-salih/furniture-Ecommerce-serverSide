import signupvalidation from "../../middleware/signValidation.js";
import User from "../../models/userSchema/userSchema.js";
import { hashPassword } from "../../utils/bcrypt.js";
export const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existuser=await User.findOne({email})
        if(existuser)return res.status(404).json({success:false,message:`email laready exist`})
        const validateuser=await signupvalidation.validateAsync({
    name,email,password
    })
    const hashpassword=await hashPassword(password)
    const newUser=new User({
        name:validateuser.name,
        email:validateuser.email,
        password:hashpassword,

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