import chuck_quotes from "./chuck_quotes.json"
import arnold_quotes from "./arnold_quotes.json"
import assert from "node:assert"

export const getRandomOne_Chuck = async() => {
    let totalAmount = chuck_quotes.length;
    let rand =  Math.floor(Math.random()*totalAmount);
    let fetchedQuote = chuck_quotes[rand];
    assert(fetchedQuote!==undefined,"getRandomOne_chuck function didn't return a quote")
    return fetchedQuote
}

export const getRandomOne_Arnold = async() => {
    let totalAmount = arnold_quotes.length;
    let rand =  Math.floor(Math.random()*totalAmount);
    let fetchedQuote = arnold_quotes[rand];
    assert(fetchedQuote!==undefined,"getRandomOne_arnold function didn't return a quote")
    return fetchedQuote
}


