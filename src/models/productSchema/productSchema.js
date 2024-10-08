import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
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
