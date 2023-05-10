import {useEffect, useState} from 'react'
import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export default function Private ({children}) {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(true)
    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if(user){
                    //logado
                    
                    setLoading(false);
                    setSigned(true)
                    localStorage.setItem('detailUser', JSON.stringify(user))
                }else{
                    //nao logado
                    setLoading(false);
                    setSigned(false)
                }
            });
            
        }
        checkLogin();
    },[])
    if (loading) {
        return(
            <div className='loading'>Loading...</div>
        )
    }
    if(!signed) {
        return <Navigate to='/Login'/>
    }
    return children;
  }