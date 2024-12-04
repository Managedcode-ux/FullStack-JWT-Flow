import React from 'react'
import { RootState } from '../store'
import {usePremQuoteQuery} from '../services/quotesApi'
import { useSelector } from 'react-redux'

// import {useSelector} from 'react-redux'
// import {useLogOutMutation} from '../services/authApi'
// const ProtectedPage = () =>{
//     const {user} = useSelector((state:RootState)=>state.auth);
//     const [logOut] = useLogOutMutation();

//     if(!user){
//         return  <div>Please log in to access this page.</div>;
//     }

//     return(
//         <div>
//             <h1>Welcome, {user.username}</h1>
//             <button onClick={() => logOut}>Logout</button>
//         </div>
//     )
// }

const ProtectedPage = () => {
    const {data} = usePremQuoteQuery(undefined,{refetchOnMountOrArgChange:true})
    
    if(data){
        return(
            <>
                <h1>Welcome</h1>
                {JSON.stringify(data)}
            </>
        )
    }
    return(
        <h1>Welecome to protected route</h1>
    )
    
}

export default ProtectedPage