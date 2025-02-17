import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { blockAndUnblockUser, getAllUsers, getUserById } from "../controllers/adminSide/adminUserListController/adminUserListController.js";
import { addProduct, deleteProduct, updateProduct } from "../controllers/adminSide/adminProductControll/adminProductControll.js";
import { getAllOrders } from "../controllers/adminSide/adminOrderController/adminOrderController.js";
import { getTotalRevenue, totalProductPurchased } from "../controllers/adminSide/adminDashboard/adminDashboard.js";
import { trycatch } from "../middleware/trycatch.js";
import { upload } from "../config/cloudinaryConfig.js";

const adminRouter=express.Router();

adminRouter.get('/users',checkAuth,trycatch(getAllUsers))
adminRouter.get('/users/:id',checkAuth,trycatch(getUserById))
adminRouter.post('/users/:id',checkAuth,trycatch(blockAndUnblockUser))


adminRouter.post('/products',checkAuth,upload.single('image'),trycatch(addProduct))
adminRouter.post('/products/:id',checkAuth,trycatch(updateProduct))
adminRouter.delete('/products/:id',checkAuth,trycatch(deleteProduct))

adminRouter.get('/orders',checkAuth,trycatch(getAllOrders))
adminRouter.get('/revenue',checkAuth,trycatch(getTotalRevenue))
adminRouter.get('/products-analytics',checkAuth,trycatch(totalProductPurchased))


export default adminRouter;