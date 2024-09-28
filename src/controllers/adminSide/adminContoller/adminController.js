import User from "../../../models/userSchema/userSchema";
import { comparepassword } from "../../../utils/bcrypt";

export const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const admin=await User.findOne({email})
        if(!admin) return res.status(404).status({success:false,message:`no user found ,please register`})
        const validuser=comparepassword(password,admin.password)
        if(!validuser) return res.status(400).json({success:false,message:`incorrect username/password`})
        if(admin.role==='admin'){
            
        }
    }  catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}