import  express  from "express";
import { signup } from "../controllers/authController/authController.js";

const userRouter=express.Router();

userRouter.post('/register',signup)


export default userRouter;