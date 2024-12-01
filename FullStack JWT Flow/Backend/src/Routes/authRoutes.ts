import express,{Router} from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import _, { find } from "lodash";
import { randomUUIDv7 } from "bun";
import { readUser,writeUser } from "../Helper/DBhelpers";
import userDb from '../UsersDB.json'

import type {User} from ".././types";

export const router = express.Router();


router.post('/register',async(req,res) => {
    try{
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser:User = {
            id:randomUUIDv7().toString(),
            username : username,
            password:hashedPassword
        };

        // User.push(newUser)
        writeUser(newUser)
        res.status(201).json({message:'User registered successfully'});
    }catch(error){
        console.log("Something went wrong \n");
        console.log(error)
        res.send(500).json({error:'Registeration failed'});
        return;
    }
})

router.post('/login',async(req:express.Request,res:express.Response)=>{
    try{
        const {username,password} = req.body;
        const user = _.find(userDb,{username:username});
        if(user === undefined){
            res.status(401).json({message:'Authentication failed'})
            return;
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            res.send(401).json({message:"Authentication failed"});
            return;
        }

        const secretKey = process.env.JWT_SECRET_KEY as string

        const token = jwt.sign(
            {userId:user.id},
            secretKey,
            {expiresIn:'1h'}
        )

        res.status(200).send({token})
    }catch(error){
        console.log("Something went wrong \n");
        console.log(error)
        res.send(500).json({error:'Registeration failed'});
        return
    }
})