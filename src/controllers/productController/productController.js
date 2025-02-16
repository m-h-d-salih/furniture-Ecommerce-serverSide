import { mongoose } from "mongoose";
import { Products } from "../../models/productSchema/productSchema.js";

export const getProducts = async (req, res) => {
    const { category } = req.query;
    let getProducts;

    if (category) {
      getProducts = await Products.find({ category,isDeleted:false });
      if (getProducts.length === 0)
        return res.status(400).json({ success: false, message: `Category not found` });
    } else {
      getProducts = await Products.find({isDeleted:false});
    }

    return res.status(200).json({
      success: true,
      data: getProducts,
      message: `Products fetched successfully`,
    });

  
};

export const getProductsById=async(req,res)=>{
        const productId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId))
            return res.status(400).json({success:false,message:`product is not available`})
        const product=await Products.findById(productId)
        if(!product)
            return res.status(400).json({success:false,message:`product is not available`})
        return res.status(200).json({success:true,data:product})

    
   
}
