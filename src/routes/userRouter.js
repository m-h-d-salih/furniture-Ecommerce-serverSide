import  express  from "express";
import { login, logout, refreshToken, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";
import {  getCart, removeFromCart } from "../controllers/cartController/cartController.js";
import checkAuth from "../middleware/checkAuth.js";
import { cartController, handlecart } from "../middleware/handlecart.js";
import { addtoWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController/wishlistController.js";
import { createOrder, getOrder } from "../controllers/orderController/orderController.js";
import { createPayment, paymentVerification } from "../controllers/paymentController/paymentController.js";
import { trycatch } from "../middleware/trycatch.js";
import { getUserProfile } from "../controllers/userController/userController.js";

const userRouter=express.Router();

userRouter.post('/register',trycatch(signup));
userRouter.post('/login',trycatch(login));
userRouter.post('/logout',trycatch(logout));
userRouter.post('/refreshtoken',trycatch(refreshToken));

userRouter.get('/products',trycatch(getProducts))
userRouter.get('/products/:id',trycatch(getProductsById));

userRouter.get('/:id',checkAuth,trycatch(getUserProfile));


userRouter.post('/cart/:id',checkAuth,handlecart,trycatch(cartController))
userRouter.delete('/cart/:id',checkAuth,trycatch(removeFromCart))
userRouter.get('/cart/:id',checkAuth,trycatch(getCart))

userRouter.post('/wishlist/:id',checkAuth,trycatch(addtoWishlist))
userRouter.get('/wishlist/:id',checkAuth,trycatch(getWishlist))
userRouter.delete('/wishlist/:id',checkAuth,trycatch(removeWishlist))

userRouter.get('/order/:id',checkAuth,trycatch(getOrder))
userRouter.post('/order/:id',checkAuth,trycatch(createOrder))



userRouter.post('/payment/:id',checkAuth,createPayment)
userRouter.post('/paymentverification/:id',checkAuth,paymentVerification)

export default userRouter;