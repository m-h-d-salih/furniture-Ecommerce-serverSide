import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose'
import userRouter from "./src/routes/userRouter.js";
// const mongoose=require('mongoose');

const app=express();
dotenv.config();
app.use(express.json())
app.use(cors());
app.use('api/user',userRouter)

main().catch(err=>console.log(err))
async function main() {
  await mongoose.connect('mongodb+srv://muheenudeen313:pVw3ZO2Lbiyzb7NP@cluster0.6l0us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

}
app.listen(5000,()=>console.log(`running `))


