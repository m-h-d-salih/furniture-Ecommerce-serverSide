import  express  from "express";
import { login, signup } from "../controllers/authController/authController.js";
import { getProducts, getProductsById } from "../controllers/productController/productController.js";

const userRouter=express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.get('/products',getProducts)
userRouter.get('/products/:id',getProductsById)


export default userRouter;