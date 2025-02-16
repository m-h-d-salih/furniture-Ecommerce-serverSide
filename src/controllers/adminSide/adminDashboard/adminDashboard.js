import Order from "../../../models/orderSchema/orderSchema.js"

export const getTotalRevenue=async(req,res)=>{

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
       
  
}

export const totalProductPurchased=async(req,res)=>{
    
        const orders=await Order.find().populate("products.productId");;
        if(orders.length===0) return res.status(404).json({success:false,message:`no sales`,data:0})
         const totalProductPurchased=orders.map(order=>order.products.map(item=>item.quantity)).flat(Infinity).reduce((a,b)=>a+b,0)
        res.status(200).json({
            success: true,
            message: `total products purchased fetched successfully`,
            data:totalProductPurchased
          });


}