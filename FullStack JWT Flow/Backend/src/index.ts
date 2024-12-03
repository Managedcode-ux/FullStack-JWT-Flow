import express, { Router } from "express"
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import { app as anonymousRoutes } from "./Routes/anonymous-route"
import { router as authenticaionRoutes } from "./Routes/authRoutes";
import {router as protectedRoutes} from "./Routes/protectedRoutes"
import dotenv from 'dotenv'

// console.log('CWD:', process.cwd()); // Ensure it matches the location of Backend

// console.log(process.env);
mongoose.connect('mongodb://localhost:27017/JWT_AUTH')

const app = express();
const port = 4000;
app.use(express.json())
app.use(cookieParser())
app.use(anonymousRoutes) // api endpoint with no authenticaion required
app.use(authenticaionRoutes) //api endpoints used for user registeration and login
app.use(protectedRoutes) // api endpoints which require authenticaion


app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})

