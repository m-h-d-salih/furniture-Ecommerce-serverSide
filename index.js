import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose'
import userRouter from "./src/routes/userRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
// const mongoose=require('mongoose');

const app=express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)


main().catch(err=>console.log(err))
async function main() {
  // await mongoose.connect('mongodb+srv://salihsha656:tRGK4jm1cYFxUYIV@cluster0.demip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  await mongoose.connect(process.env.MONGO_URI);

}
app.listen(5000,()=>console.log(`running `))


