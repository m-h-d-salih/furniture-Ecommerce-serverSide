import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose'
import userRouter from "./src/routes/userRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
import { errorHandler } from "./src/middleware/errorhandling.js";
// const mongoose=require('mongoose');

const app=express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

const PORT=process.env.PORT || 5000

main().catch(err=>console.log(err))
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
 console.log(`connected to mongodb`)
}
app.use(errorHandler)
// app.listen(5000,()=>console.log(`server running on 5000`))
app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT} `))


