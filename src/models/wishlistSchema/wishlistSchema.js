import mongoose from "mongoose";

const wishlistSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
            required:true
        }
    }]
    
},{Timestamp:true})
const Wishlist=mongoose.model('Wishlist',wishlistSchema)
export default Wishlist