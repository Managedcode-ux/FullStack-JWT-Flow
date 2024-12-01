import jwt from 'jsonwebtoken'
import express from 'express'



function verifyToken(req:any,res:any,next:express.NextFunction){
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({error:"Access Denied"});
        return
    }  
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string)
        if(typeof decoded !== 'string'){
            req.userId = decoded.userId;
            next();
        }
    }catch(error){
        res.status(401).json({error:'Invalid Tokens'})
        return
    }
}

export default verifyToken