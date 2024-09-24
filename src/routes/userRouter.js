import  express  from "express";
import { login, logout, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";
import { addtoCart } from "../controllers/cartController/cartController.js";
import checkAuth from "../middleware/checkAuth.js";

const userRouter=express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/products',getProducts)
userRouter.get('/products/:id',getProductsById)
userRouter.post('/:id/cart',checkAuth,addtoCart)


export default userRouter;