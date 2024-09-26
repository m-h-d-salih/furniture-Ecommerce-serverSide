import mongoose from 'mongoose';
import Cart from "../../models/cartSchema/cartSchema.js";
import razorpay from "../../config/razorpay.js";

const MIN_ORDER_AMOUNT = 100; // Set your minimum order amount here

export const createPayment = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currency } = req.body;

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        // Retrieve cart for the user
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }

        // Calculate total amount
        const amount = cart.products.map(item => item.productId.price * item.quantity).reduce((a, b) => a + b, 0);

        // Check for minimum order amount
        if (amount < MIN_ORDER_AMOUNT) {
            return res.status(400).json({
                success: false,
                message: `Order amount must be at least ${MIN_ORDER_AMOUNT}. Your total is ${amount}.`
            });
        }

        // Validate currency
        if (!currency) {
            return res.status(400).json({ success: false, message: "Please provide currency" });
        }

        // Create order options
        const receipt = `receipt_${Date.now()}`;
        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt
        };

        // Create Razorpay order
        try {
            const order = await razorpay.orders.create(options);
            if (!order) {
                console.log("Order creation error:", order);
                return res.status(500).json({ success: false, message: "Order creation failed" });
            }

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
