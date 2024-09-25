
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
        default: "user",
      },
    password:{
        required:true,
        type:String
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

},
{
    timestamps: true,
  }
)
const  User=mongoose.model('User',userSchema)
export default User