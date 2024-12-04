import React from 'react'
import {useForm} from 'react-hook-form'
import {useSignupMutation} from '../services/authApi'


const Signup = () => {
    const {register,handleSubmit} = useForm()
    const [signup] = useSignupMutation()

    const onSubmitHandler = async(data:any) => {
        try{
            const result = await signup(data).unwrap();
            console.log(result)
        }catch(err){
            console.error('Signup Failed: ', err)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input {...register('username')} placeholder='Username'/>
            <input type='password' {...register('password')} placeholder='Password'/>
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default Signup