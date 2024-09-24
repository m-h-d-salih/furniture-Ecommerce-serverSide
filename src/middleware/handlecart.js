import { addtoCart, decrementQuantity, incrementQuantity } from "../controllers/cartController/cartController.js";

export const handlecart=async(req,res,next)=>{
    try{
        const {action}=req.body;
        if(action==='increment'){
            req.controller=incrementQuantity;
        }
        else if(action==='decrement'){
            req.controller=decrementQuantity
        }
        else{
            req.controller=addtoCart;
        }
            next();
    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}
export const cartController=async(req,res,next)=>{
    try{
        req.controller(req,res,next)
    }catch (error) {
    res
      .send(500)
      .json({ success: false, message: `Bad request ${error.message}` });
  }
}