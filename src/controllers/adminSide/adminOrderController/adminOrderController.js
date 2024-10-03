import Order from "../../../models/orderSchema/orderSchema.js"

export const getAllOrders=async(req,res)=>{
    try{
        const orders = await Order.find()
      .populate({
        path:
         'products.productId', 
        // model: 'Products', 
        // select: 'productName price category image', 
      });
        if(orders.length===0) return res.status(404).json({
            success: false,
            message: 'No orders found',
            data:[]
          });
         res.status(200).json({success:true,message:`order fteched successfully`,data:orders}) 
    }catch(error){
    return res.status(500).json({success:false,message:`internal server error ${error.message}`})
}
}