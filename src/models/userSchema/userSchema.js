
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
    password:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date
    }

},
{
    timestamps: true,
  }
)
const  User=mongoose.model('User',userSchema)
export default User