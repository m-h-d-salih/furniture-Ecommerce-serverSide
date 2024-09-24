import mongoose from "mongoose";
import { Products } from "../../models/productSchema/productSchema.js";
import User from "../../models/userSchema/userSchema.js";
import Cart from "../../models/cartSchema/cartSchema.js";

export const addtoCart=async(req,res)=>{
   try{
    const userId=req.params.id;
    const {productId,quantity=1}=req.body;
    
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid userid`})
    if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid productid`})
    if( quantity<=0) return res.status(400).json({success:false,message:`quantity must be greater than zero`})
    const user=await User.findById(userId);
// console.log(user.cart);

    if(!user) return res.status(404).json({success:false,message:`user does not exist`})
    const product=await Products.findById(productId)
    if(!product) return res.status(404).json({success:false,message:`product ddoes no exist`})
    let cart=await Cart.findOne({userId})
if(!cart){
    cart=new Cart({userId,products:[{productId,quantity}]});
    user.cart = cart._id
}else{
    const existingproduct=cart.products.find(product=>product.productId.toString()===productId)
    if(existingproduct){
       
        existingproduct.quantity+=quantity

    }else{
        cart.products.push({ productId, quantity }); 
    }
}
    await user.save();
    await cart.save();
   return res.status(200).json({success:true,data:cart,message:`item added to cart`})
   } 
catch(error){
    return res.status(500).json({success:false,message:`failed to add product to cart ${error}`})
}

}