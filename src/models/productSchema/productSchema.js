import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        required:true,
        type:Number
    },
    stock:{
        required:true,
        type:Number
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})
export const Products=mongoose.model('Products',productSchema)
