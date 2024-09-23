import User from "../../models/userSchema/userSchema.js";
export const signup=async (req,res)=>{
    try{
        const{name,email,password}=req.body;
        const existuser=await User.findOne({email})
        if(existuser)return res.status(404).json({success:false,message:`email laready exist`})
        
    }
    catch(error){
        return res.status(404).json({success:false,message:`bad request ${error.message}`})
      
    }
}