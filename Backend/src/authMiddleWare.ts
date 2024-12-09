import jwt from 'jsonwebtoken'
import express from 'express'



function verifyToken(req:any,res:any,next:express.NextFunction){

    let accessToken = req.header('Authorization');
    const refreshToken = req.cookies['refreshToken']
    if(!accessToken && !refreshToken){
        res.status(401).json({error:"Access Denied"});
        return
    }  
    try{
        let decoded:any;
        if(accessToken){
            try{ //check if accessToken is valid
                console.log('Checking access token validity')
                decoded = jwt.verify(accessToken,process.env.JWT_SECRET_KEY as string)
            }catch(error:any){ // if token access invalid use and check refresh token
                if(error.name==='TokenExpiredError'){
                    try{ //checking if refresh token is valid or not
                        console.log('Checking refresh token validity')
                        decoded = jwt.verify(
                            refreshToken,
                            process.env.REFRESH_SECRET_KEY as string
                        )
                        const newAccessToken = jwt.sign(
                            {userId:decoded.userId},
                            process.env.JWT_SECRET_KEY as string,
                            {expiresIn:'1m'}
                        )
                        // Set the new token in response header
                        res.set('Authorization',newAccessToken)
                         // Add this header to allow the client to read Authorization
                        res.set('Access-Control-Expose-Headers','Authorization')
                    }
                    catch(error:any){ // if refresh token is also invalid return error
                        
                        res.status(401).json({error:'Invalid refresh and access tokens'})
                        return
                    }
                }else{ // return if error is something other than TokenExpiredError
                    res.status(401).json({error:'Invalid refresh and access tokens'})
                    return
                }
            }
        }else{
            res.status(401).json({error:'Invalid refresh and access tokens'})
            return

        }
        req.userId = decoded.userId
        next()
    }catch(error){
        res.status(401).json({error:'Invalid Tokens'})
        return
    }
}

export default verifyToken

/* FUTURE IMPROVEMENTS 
    1. Stop getting the refresh cookie at the top of middleware, instead get it when cheking the validity of refreshToken so that if cookie is not present the program 
    does not crash. Currently if the refreshCookie is not provided in the request program crashes

    2. Create a wrapper function for jwt.verify that would return boolean values as because currently jwt.verify returns a Exception if token is invalid, to handle
    this exception try catch is used which when nested creates a complex flow. A function like verifyToken can wrap jwt.verify and can easily be handeled using if else.

    3. Create a logOut mechanism

    4. Implement a refresh Cookie rotation and invalidation (probably not both at same time)
*/