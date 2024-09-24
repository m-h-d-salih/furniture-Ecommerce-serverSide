import  express  from "express";
import { login, logout, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";
import {  getCart, removeFromCart } from "../controllers/cartController/cartController.js";
import checkAuth from "../middleware/checkAuth.js";
import { cartController, handlecart } from "../middleware/handlecart.js";

const userRouter=express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);

userRouter.get('/products',getProducts)
userRouter.get('/products/:id',getProductsById)


userRouter.post('/:id/cart',checkAuth,handlecart,cartController)
userRouter.delete('/:id/cart',checkAuth,removeFromCart)
userRouter.get('/:id/cart',checkAuth,getCart)


export default userRouter;