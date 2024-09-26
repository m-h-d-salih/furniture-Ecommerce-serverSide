import mongoose from "mongoose";
import User from "../../models/userSchema/userSchema.js";
import Cart from "../../models/cartSchema/cartSchema.js";
import Order from "../../models/orderSchema/orderSchema.js";

export const getOrder=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({success:false,message:`invalid user id`})
        const user=await User.findById(userId)
        if(!user)return res.status(400).json({success:false,message:`user not found`})
        const order=await Order.findOne({userId}).populate('products.productId')
        if (order.length === 0) {
            return res.status(200).json({ success: true, message: "No orders found for this user.", data: [] });
          }        res.status(200).json({success:true,data:order})
    }catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}
export const createOrder=async(req,res)=>{
    try{
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId))return res.status(400).json({success:false,message:`invalid user id`})
        const user=await User.findById(userId)
        if(!user)return res.status(400).json({success:false,message:`user not found`})
        const cart=await Cart.findOne({userId})
        if(!cart)return res.status(400).json({success:false,message:`cart not found`})
            const totalAmount = cart.products.reduce((total, item) => 
                total + (item.productId.price * item.quantity), 0);
            const newOrder = new Order({
                userId: user._id,
                products: cart.products.map(item => ({
                  productId: item.productId._id,
                  quantity: item.quantity,
                  price: item.productId.price, 
                //   totalAmount
                })),
                totalAmount
              });
          
          
              await newOrder.save();
          
            
              cart.products = [];
              await cart.save();
        
              await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
          
             
              return res.status(200).json({ success: true, message: "Order placed successfully", data: newOrder });

    }catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}