import { json } from "express";
import type { User } from "../types";

export const readUser = async() => {
    try{
        const file = await Bun.file('../UsersDB.json').json();
        return file
    }catch(error){
        console.log(error);
    }
}

export const writeUser = async(data:User) => {
    try{
        const file = Bun.file('D:\\Tracers\\FullStack JWT Flow\\Backend\\src\\UsersDB.json')
        const fileContent = await file.text();
        const users: User[] = JSON.parse(fileContent)
        users.push(data);
        await Bun.write('D:\\Tracers\\FullStack JWT Flow\\Backend\\src\\UsersDB.json',JSON.stringify(users,null,4))
        const recheckfile = Bun.file('D:\\Tracers\\FullStack JWT Flow\\Backend\\src\\UsersDB.json').text();
        console.log(recheckfile)
    }catch(error){
        console.log(error)
    }
}