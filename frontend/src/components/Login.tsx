import React from 'react';
import {useForm} from 'react-hook-form';
import { useLoginMutation } from '../services/authApi';

const Login = () => {
    const {register,handleSubmit} = useForm();
    const [login]  = useLoginMutation()

    const onSubmitHandler = async(data:any) => {
        try{
            const result = await login(data);
            console.log(result)
        }catch(err){
            console.error("Something went wrong: ", err)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input {...register('username')} placeholder="Username" />
            <input type="password" {...register('password')} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login