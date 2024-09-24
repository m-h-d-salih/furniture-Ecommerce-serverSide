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
    price:{
        required:true,
        type:Number
    },
    quantity:{
        required:true,
        type:Number
    }
})
export const Products=mongoose.model('Products',productSchema)
