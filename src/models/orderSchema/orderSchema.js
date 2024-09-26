import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      quantity: { 
        type: Number,
        required: true,
        default: 1  
      }
    }
  ],
  totalAmount: { 
    type: Number,
    // required: true
  },
  paymentId: { 
    type: String,
  },
  totalItems: { 
    type: Number,
  },
  customerName: {
    type: String,
  },
  address:{type:String},
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  contact: {
    type: Number,
  },


},{timestamps: true})
const Order=mongoose.model('Order',orderSchema)
export default Order;