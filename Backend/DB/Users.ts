import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, unique:true, require:true},
    password:{type:String, require:true},
    refreshToken:{type:String}
})

export const User = mongoose.model('User',userSchema)
