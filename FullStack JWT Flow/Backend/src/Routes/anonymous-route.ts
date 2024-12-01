import express  from "express"
import {getRandomOne_Chuck} from "../Helper/quoter";

export const app = express.Router();

app.get('/random-quote',async(req,res)=>{
    const returnedQuote = await getRandomOne_Chuck();
    res.status(200).json(returnedQuote)
})

