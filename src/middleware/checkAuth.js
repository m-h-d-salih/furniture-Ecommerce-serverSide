import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const checkAuth=async(req,res,next)=>{
   try{
    const token=req.headers.authorization;
    if(!token) return res.status(404).json({success:false,message:`access denied`})
    const validtoken=jwt.verify(token,process.env.TOKEN_SECRET);
    if(!validtoken) return res.status(404).json({success:false,message:`ivalid token`})
    next();
   } 
   catch(error){
    return res.status(500).json({success:false,message:`internal server error ${error.message}`})
   }
}
export default checkAuth;