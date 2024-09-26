import  express  from "express";
import { login, logout, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";
import {  getCart, removeFromCart } from "../controllers/cartController/cartController.js";
import checkAuth from "../middleware/checkAuth.js";
import { cartController, handlecart } from "../middleware/handlecart.js";
import { addtoWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController/wishlistController.js";
import { createOrder, getOrder } from "../controllers/orderController/orderController.js";
import { createPayment } from "../controllers/paymentController/paymentController.js";

const userRouter=express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);

userRouter.get('/products',getProducts)
userRouter.get('/products/:id',getProductsById)


userRouter.post('/:id/cart',checkAuth,handlecart,cartController)
userRouter.delete('/:id/cart',checkAuth,removeFromCart)
userRouter.get('/:id/cart',checkAuth,getCart)

userRouter.post('/:id/wishlist',checkAuth,addtoWishlist)
userRouter.get('/:id/wishlist',checkAuth,getWishlist)
userRouter.delete('/:id/wishlist',checkAuth,removeWishlist)

userRouter.get('/:id/order',checkAuth,getOrder)
userRouter.post('/:id/order',checkAuth,createOrder)



userRouter.post('/:id/payment',checkAuth,createPayment)

export default userRouter;