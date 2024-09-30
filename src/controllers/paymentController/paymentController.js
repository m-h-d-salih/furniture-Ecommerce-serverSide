import mongoose from 'mongoose';
import Cart from "../../models/cartSchema/cartSchema.js";
import razorpay from "../../config/razorpay.js";
import User from '../../models/userSchema/userSchema.js';
import Order from '../../models/orderSchema/orderSchema.js';
import Payment from '../../models/paymentSchema/paymentSchema.js';
import crypto from "crypto";

// const minamount = 10; 

export const createPayment = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currency } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }
        // console.log(cart)
        const amount = cart.products.map(item => item.productId.price * item.quantity).reduce((a, b) => a + b, 0);
        // if (amount < minamount) {
        //     return res.status(400).json({
        //         success: false,
        //         message: `Order amount must be at least ${MIN_ORDER_AMOUNT}. Your total is ${amount}.`
        //     });
        // }
        if (!currency) {
            return res.status(400).json({ success: false, message: "Please provide currency" });
        }

        const receipt = `receipt_${Date.now()}`;
        const options = {
            amount: amount * 100, 
            currency,
            receipt
        };

        try {
            const order = await razorpay.orders.create(options);
            if (!order) {
                console.log("Order creation error:", order);
                return res.status(500).json({ success: false, message: "Order creation failed" });
            }
            // cart.products = []; 
            // await cart.save()

            res.status(200).json({
                success: true,
                data: order,
                message: "Payment order successfully created",
            });
        } catch (error) {
            console.error("Razorpay Order Creation Error:", error);
            res.status(500).json({
                success: false,
                message: `Razorpay Order Creation Failed: ${error.response ? error.response : error.message}`,
            });
        }
    } catch (error) {
        console.error("Error in createPayment function:", error);
        res.status(500).json({
            success: false,
            message: `Failed to create payment order: ${error.message}`,
        });
    }
};


export  const paymentVerification = async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =req.body;
      const userId = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({success:false,message:"Invalid user id"})
      }
      const cart = await Cart.findOne({ userId }).populate("products.productId");
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }
      const amount = cart.products.map(item => item.productId.price * item.quantity).reduce((a, b) => a + b, 0);

      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({success: false,message: "Missing payment verification details",});
      }
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        const user = await User.findById(userId);

        const order = new Order({
          userId,
          products: cart.products.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          Total_Amount: amount,
          Payment_Id: razorpay_payment_id,
          Customer_Name: user.UserName,
          Total_Items: cart.products.length,
          // address: user.address,
          // city: user.city,
          // state: user.state,
          // pincode: user.pincode,
          contact: user.contact,
        });

        await order.save();

        await Cart.deleteOne({ userId });

        const payment = new Payment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: amount,
          currency: req.body.currency,
          status: "success",
        });

        user.order.push(order._id);
        await user.save();
        await payment.save();

        res.status(200).json({
          success: true,
          message: "Payment verification successful and Ordered Successfully ",
          data: payment,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid payment signature",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message:` Payment verification failed: ${error.message}`,
      });
    }
  };