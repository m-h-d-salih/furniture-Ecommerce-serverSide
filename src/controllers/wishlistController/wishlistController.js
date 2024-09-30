import mongoose from "mongoose";
import { Products } from "../../models/productSchema/productSchema.js";
import User from "../../models/userSchema/userSchema.js";
import Wishlist from "../../models/wishlistSchema/wishlistSchema.js";

export const addtoWishlist=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
            const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
        const prodcut=await Products.findById(productId)
        if(!prodcut) return res.status(404).json({success:false,message:` product not found`})
        let  wishlist=await Wishlist.findOne({userId})
        if(!wishlist){
            wishlist=new Wishlist({userId,
                products:[{productId}]
            })
            
        } else{
            const existproduct=wishlist.products.find(product=>product.productId.toString()===productId)
            if(existproduct) return res.status(400).json({success:false,message:` product already exist in wishlist`})
                wishlist.products.push({productId})
        }
        
    await wishlist.save()
    await user.save()
        res.status(200).json({success:true,data:wishlist,message:`product added to wishlist`})
    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}
export const getWishlist=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        const wishlist=await Wishlist.findOne({userId})
        if(!wishlist)   return res.status(404).json({ success: false, message: "wishlist not found" });
    res.status(200).json({success:true,data:wishlist, message: "Wishlist fetched successfully"})
 
        }

    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}
export const removeWishlist=async(req,res)=>{
    try{
        const userId=req.params.id
        const{productId}=req.body
        if (!mongoose.Types.ObjectId.isValid(userId))  return res.status(400).json({ success: false, message: "Invalid user ID" });
        const prodcuexist=await Products.findById(productId);
        if(!prodcuexist) return res.status(404).json({ success: false, message: "prodcut  not found" });
        const user=await User.findById(userId)
        if(!user) return res.status(404).json({ success: false, message: "user  not found" });
        const wishlist=await Wishlist.findOne({userId})
        if(!wishlist) return res.status(404).json({ success: false, message: "wishlist does not exist" });
        const productindex=wishlist.products.findIndex(product=>product.productId.toString()===productId)
        if(productindex.length===-1) return res.status(404).json({ success: false, message: "product not found in wishlist" });
        wishlist.products.splice(productindex,1)
        // if(wishlist.products.length===0){
        //     await User.findByIdAndUpdate(userId,{$unset:{wishlist:''}})
        //     await Wishlist.deleteOne({_id:wishlist._id})
        // }
        // else{
            await wishlist.save()
        // }
        await user.save()
        res.status(200).json({
            success: true,
            data: wishlist.products,
            message: "Product removed from wishlist successfully",
          });


    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}