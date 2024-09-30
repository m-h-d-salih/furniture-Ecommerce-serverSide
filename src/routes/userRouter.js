import  express  from "express";
import { login, logout, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";
import {  getCart, removeFromCart } from "../controllers/cartController/cartController.js";
import checkAuth from "../middleware/checkAuth.js";
import { cartController, handlecart } from "../middleware/handlecart.js";
import { addtoWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController/wishlistController.js";
import { createOrder, getOrder } from "../controllers/orderController/orderController.js";
import { createPayment, paymentVerification } from "../controllers/paymentController/paymentController.js";

const userRouter=express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);

userRouter.get('/products',getProducts)
userRouter.get('/products/:id',getProductsById)


userRouter.post('/cart/:id',checkAuth,handlecart,cartController)
userRouter.delete('/cart/:id',checkAuth,removeFromCart)
userRouter.get('/cart/:id',checkAuth,getCart)

userRouter.post('/wishlist/:id',checkAuth,addtoWishlist)
userRouter.get('/wishlist/:id',checkAuth,getWishlist)
userRouter.delete('/wishlist/:id',checkAuth,removeWishlist)

userRouter.get('/order/:id',checkAuth,getOrder)
userRouter.post('/order/:id',checkAuth,createOrder)



userRouter.post('/payment/:id',checkAuth,createPayment)
userRouter.post('/paymentverification/:id',checkAuth,paymentVerification)

export default userRouter;