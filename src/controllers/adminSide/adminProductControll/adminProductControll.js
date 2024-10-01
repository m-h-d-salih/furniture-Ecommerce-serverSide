import mongoose from "mongoose";
import lodash from "lodash";
import { addProductValidation, updateProductValidation } from "../../../middleware/joiValidation/productValidation.js";
import { Products } from "../../../models/productSchema/productSchema.js";
import Cart from "../../../models/cartSchema/cartSchema.js";
import Wishlist from "../../../models/wishlistSchema/wishlistSchema.js";


//add product
export const addProduct=async(req,res)=>{
    try{
        const {title}=req.body;
        // console.log(req.body)
        const validatedProduct=await addProductValidation.validateAsync(req.body);
        // console.log(validatedProduct)
        const existingproduct=await Products.findOne({title});
        if(existingproduct)return res.status(400).json({success:false,message:'product already exist'})
        const newproduct=await Products(validatedProduct)
     await newproduct.save()
     res.status(200).json({
        success: true,
        message: "Product added successfully",
        data: newproduct,
      });

    }catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        success: false,
        message: `validation error ${error.message} `,
      });
    } else { 

      res
        .status(500)
        .json({ success: false, message: `Bad request:${error.message}` });
    }
  }
}
//delete product

export const deleteProduct=async(req,res)=>{
    try{
        const productId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
        const deletedproduct=await Products.findByIdAndUpdate(productId,{isDeleted:true},{new:true})
        if(!deletedproduct) return res.status(404).json({success:false,message:`product not found`})
        res.status(200).json({success:true,message:`product deleted successfully`,data:deletedproduct})
        
        await Cart.updateMany(
          { 'products.productId': productId }, 
          { $pull: { products: { productId: productId } } } 
        );
        await Wishlist.updateMany(
          { 'products.productId': productId }, 
          { $pull: { products: { productId: productId } } } 
        );
    }catch(error){
    return res.status(500).json({success:false,message:`internal server error ${error.message}`})
}
}


//update product
export const updateProduct=async(req,res)=>{
    try{
        const productId=req.params.id;
        const productUpdate=req.body;
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
            await updateProductValidation.validateAsync(productUpdate);
        // const existingProduct=await Products.findById(prodcutId)
        // if(!existingProduct) return res.status(400).json({success:false,message:`the product does not exist`})
       const {isEqual}=lodash;
        const isDataSame = isEqual(req.body, {
            title: productUpdate.title,
            // description: productUpdate.description,
            price: productUpdate.price,
            // image: productUpdate.image,
            category: productUpdate.category,
            stock: productUpdate.stock,
            // is_Listed: productUpdate.is_Listed,
            // is_deleted: existingProduct.is_deleted,
          });
      if(isDataSame)return res.status(400).json({success:false,message:`no changes made`})
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,           
            productUpdate,       
            { new: true }       
          );
        if(!updatedProduct) return res.status(404).json({success:false,message:`the product does not exist`})
        res.status(200).json({success:true,data:updatedProduct})
    }catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        success: false,
        message: `validation error ${error.message} `,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: `Bad request:${error.message}` });
    }
  }
}