import { required } from 'joi'
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
        required:true
    }
})
