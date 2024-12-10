import express,{Router} from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _, { find } from "lodash";
import { randomUUIDv7 } from "bun";
import {User} from '../../DB/Users'

import type {customJWTtype, UserType} from ".././types";

export const router = express.Router();


router.post('/register',async(req,res) => {
    try{
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUserData:UserType = {
            username : username,
            password:hashedPassword,
            refreshToken:null
        };
        const newUser = new User(newUserData);
        await newUser.save()
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
        const user:UserType|null = await User.findOne({username})
        if(user === undefined || user===null){
            res.status(401).json({message:'Authentication failed'})
            return;
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            res.send(401).json({message:"Authentication failed"});
            return;
        }


        //generate access token and refresh token
        const accessToken = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn:'1m'}
        )

        const refreshToken = jwt.sign(
            {
                userId:user._id,
                 createdAt:Date.now() // this date will be use to invalidate the refresh token 
            },
            process.env.REFRESH_SECRET_KEY as string,
            {expiresIn:'30d'}
        )
        // user.refreshToken = refreshToken; //setting refresh token to user
        
        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } });

        res
        .cookie('refreshToken',refreshToken,{httpOnly:true,sameSite:'lax', secure:true, path:'/'})
        .header('Authorization', accessToken)
        .json({accessToken,refreshToken})
        
    }catch(error){
        console.log("Something went wrong \n");
        console.log(error)
        res.send(500).json({error:'Registeration failed'});
        return
    }
})


// Route specifically implemented for token rotation
router.post('/refresh',async(req,res) => {
    const refreshToken = req.cookies['refreshToken'];
    
    if(!refreshToken){
        res.status(401).json({error:'Access Denied. No refresh token provided'})
        return
    }

    try{
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY as string
        ) as customJWTtype

        const newAccessToken =  jwt.sign(
            {userId:decoded.userId},
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1h' }
        )

        //Remove expired refresh token
        await User.findByIdAndUpdate(
            decoded.userId, 
            { $set: { refreshToken: null } }
        )

        res.header('Authorization',newAccessToken).send(newAccessToken)

    }catch(error){
        res.status(400).json({ error: 'Invalid Token.' });
        return
    }
})