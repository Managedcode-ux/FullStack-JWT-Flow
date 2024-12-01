import express from 'express'
import verifyToken from '../authMiddleWare'
import {getRandomOne_Arnold, getRandomOne_Chuck} from '../Helper/quoter'

export const router = express.Router()

router.get('/getProtectedQuotes',verifyToken,async(req:any,res)=>{
    const returnedChuckQuote = await getRandomOne_Chuck();
    const returnedArnoldQuote = await getRandomOne_Arnold();
    res.status(200).json({'Chuck Says':returnedChuckQuote, 'Arnold Says': returnedArnoldQuote})
})

