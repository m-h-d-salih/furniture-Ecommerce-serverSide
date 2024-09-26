import mongoose from "mongoose";
import { Products } from "../../models/productSchema/productSchema.js";
import User from "../../models/userSchema/userSchema.js";
import Cart from "../../models/cartSchema/cartSchema.js";

export const addtoCart=async(req,res)=>{
   try{
    // console.log(`add to cart`)
    const userId=req.params.id;
    const {productId,quantity=1}=req.body;
    
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid userid`})
    if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid productid`})
    if( quantity<=0) return res.status(400).json({success:false,message:`quantity must be greater than zero`})
    const user=await User.findById(userId);
// console.log(user.cart);

    if(!user) return res.status(404).json({success:false,message:`user does not exist`})
    const product=await Products.findById(productId)
    if(!product) return res.status(404).json({success:false,message:`product does no exist`})
    let cart=await Cart.findOne({userId})
if(!cart){
    cart=new Cart({userId,products:[{productId,quantity}]});
    user.cart = cart._id
}else{
    const existingproduct=cart.products.find(product=>product.productId.toString()===productId)
    if(existingproduct){
       
        // existingproduct.quantity+=quantity
        return res.status(404).json({success:false,message:`product alredy exist in cart `})

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
export const getCart=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid userid`})
        const user=await User.findById(userId)
        if(!user) return res.status(400).json({success:false,message:`user not found`})
        const cart=await Cart.findOne({userId}).populate('products.productId')
        if(!cart) return res.status(400).json({success:false,message:`cart not found`})
            // console.log(cart)
        res.status(200).json({success:true,data:cart,message:`cart fetched successfully`})
        
}
catch(error){
    return res.status(500).json({success:false,message:`internal server error ${error.message}`})
}
}
export const removeFromCart=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid prodcut id`})
        const user=await User.findById(userId)
         const cart=await Cart.findOne({userId})
        
        if(!cart) return res.status(400).json({success:false,message:`no cart found`})
        const productexist=cart.products.findIndex(product=>product.productId.toString()===productId)
        if(productexist===-1) return res.status(400).json({success:false,message:`product not found in cart`})
        cart.products.splice(productexist,1)
        // if(cart.products.length===0){
        //     await User.findByIdAndUpdate(userId,{$unset:{cart:''}})
        //     await Cart.deleteOne({_id:cart._id})
        // }
        // else{
            await cart.save()
        // }
        await user.save()
        res.status(200).json({success:true,data:cart,message:`cartitem deleted  successfully`})
    }
    catch(error){
        return res.status(500).json({sucess:false,message:`internal server error ${error.message}`})
    }
}
export const incrementQuantity=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
        const user=await User.findById(userId);
        const product=await Products.findById(productId);
        const cart = await Cart.findOne({ userId });
        if(!user) return res.status(400).json({success:false,message:`user not found`})
        if(!product) return res.status(400).json({success:false,message:`product not found`})
        if(!cart) return res.status(400).json({success:false,message:`cart not found`})
        const existproduct=cart.products.findIndex(product=>product.productId.toString()===productId)
        if(existproduct===-1) 
        {

            return res.status(400).json({success:false,message:`product  not found in cart`})
        }
        else{
            cart.products[existproduct].quantity+=1
        }
        await cart.save();
        res.status(200).json({success:true,data:cart,message:`quantity incremented by 1`})

    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error}`})
    }
}
export const decrementQuantity=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
        const user=await User.findById(userId);
        const product=await Products.findById(productId);
        const cart = await Cart.findOne({ userId });
        if(!user) return res.status(400).json({success:false,message:`user not found`})
        if(!product) return res.status(400).json({success:false,message:`product not found`})
        if(!cart) return res.status(400).json({success:false,message:`cart not found`})
        const existproduct=cart.products.findIndex(product=>product.productId.toString()===productId)
        if(existproduct===-1) 
        {

            return res.status(400).json({success:false,message:`product  not found in cart`})
        }
        else{
            cart.products[existproduct].quantity-=1
        }
        await cart.save();
        res.status(200).json({success:true,data:cart,message:`quantity incremented by 1`})

    }
    catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error}`})
    }
}