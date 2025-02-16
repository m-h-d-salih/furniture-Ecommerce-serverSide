import mongoose from "mongoose";
import lodash from "lodash";
import { addProductValidation, updateProductValidation } from "../../../middleware/joiValidation/productValidation.js";
import { Products } from "../../../models/productSchema/productSchema.js";
import Cart from "../../../models/cartSchema/cartSchema.js";
import Wishlist from "../../../models/wishlistSchema/wishlistSchema.js";


//add product
export const addProduct=async(req,res)=>{
    
        const {name}=req.body;
        // console.log(req.body)
        const validatedProduct=await addProductValidation.validateAsync(req.body);
        // console.log(validatedProduct)
        const existingproduct=await Products.findOne({name});
        if(existingproduct)return res.status(400).json({success:false,message:'product already exist'})
        const newproduct=await Products(validatedProduct)
     await newproduct.save()
     res.status(200).json({
        success: true,
        message: "Product added successfully",
        data: newproduct,
      });

    
  
}
//delete product

export const deleteProduct=async(req,res)=>{
   
        const productId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({success:false,message:`invalid product id`})
        const product=await Products.findById(productId)
      product.isDeleted=!product.isDeleted
      const deletedproduct=await product.save()
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
  
}


//update product
export const updateProduct=async(req,res)=>{
   
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
            // isDeleted: existingProduct.is_deleted,
          });
      if(isDataSame)return res.status(400).json({success:false,message:`no changes made`})
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,           
            productUpdate,       
            { new: true }       
          );
        if(!updatedProduct) return res.status(404).json({success:false,message:`the product does not exist`})
        res.status(200).json({success:true,data:updatedProduct})
    
}