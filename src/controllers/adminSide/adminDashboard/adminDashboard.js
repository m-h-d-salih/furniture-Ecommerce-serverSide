import Order from "../../../models/orderSchema/orderSchema.js"

export const getTotalRevenue=async(req,res)=>{
    try{
        const orders=await Order.find().populate("products.productId");;
        if(orders.length===0) return res.status(404).json({success:false,message:`no order found`,totalRevenue:0})
            const totalRevenue = orders
        .map((order) =>
          order.products.map((product) => {
            if (product.productId) return product.productId.price;
          })
        )
        .flat(Infinity)
        .reduce((a, b) => a + b, 0);
  
      // console.log(totalRevenue);
       res.status(200).json({
        success: true,
        message: `Total revenue calculated successfully`,
        totalRevenue
      });
       
    }catch(error){
        return res.status(500).json({success:false,message:`internal server error ${error.message}`})
       }
}