import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { blockAndUnblockUser, getAllUsers, getUserById } from "../controllers/adminSide/adminUserListController/adminUserListController.js";
import { addProduct, deleteProduct, updateProduct } from "../controllers/adminSide/adminProductControll/adminProductControll.js";
import { getAllOrders } from "../controllers/adminSide/adminOrderController/adminOrderController.js";

const adminRouter=express.Router();

adminRouter.get('/users',checkAuth,getAllUsers)
adminRouter.get('/users/:id',checkAuth,getUserById)
adminRouter.post('/users/:id',checkAuth,blockAndUnblockUser)


adminRouter.post('/products',checkAuth,addProduct)
adminRouter.post('/products/:id',checkAuth,updateProduct)
adminRouter.delete('/products/:id',checkAuth,deleteProduct)

adminRouter.get('/orders',checkAuth,getAllOrders)


export default adminRouter;