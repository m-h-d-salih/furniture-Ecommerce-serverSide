import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',required:true
    },
    products:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Products',required:true},
        quantity:{type:Number,required:true,default:1}

    }]
}, { timestamps: true })
 const Cart=mongoose.model('Cart',cartSchema)
 export default Cart;