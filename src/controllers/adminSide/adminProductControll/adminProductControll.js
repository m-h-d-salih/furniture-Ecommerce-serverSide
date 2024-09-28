import mongoose from "mongoose";
import { addProductValidation, updateProductValidation } from "../../../middleware/joiValidation/productValidation.js";
import { Products } from "../../../models/productSchema/productSchema.js";


//add product
export const addProduct=async(req,res)=>{
    try{
        const {title}=req.body;
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


//update product
export const updateProduct=async(req,res)=>{
    try{
        const prodcutId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(prodcutId)) return res.status(400).json({success:false,message:`invalid product id`})
            await updateProductValidation.validateAsync(productUpdate);
        const existingproduct=await Products.findById(prodcutId)
        if(!existingproduct) return res.status(400).json({success:false,message:`the product does not exist`})
        
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