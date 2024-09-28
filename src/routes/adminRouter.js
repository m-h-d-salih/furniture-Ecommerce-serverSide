import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { blockAndUnblockUser, getAllUsers, getUserById } from "../controllers/adminSide/adminUserListController/adminUserListController.js";
import { addProduct } from "../controllers/adminSide/adminProductControll/adminProductControll.js";

const adminRouter=express.Router();

adminRouter.get('/users',checkAuth,getAllUsers)
adminRouter.get('/users/:id',checkAuth,getUserById)
adminRouter.post('/users/:id',checkAuth,blockAndUnblockUser)


adminRouter.post('/products',checkAuth,addProduct)


export default adminRouter;