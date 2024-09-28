
import mongoose from 'mongoose'
// const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    password:{
        required:true,
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Wishlist'
    },
    
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]

},
{
    timestamps: true,
  }
)
const  User=mongoose.model('User',userSchema)
export default User