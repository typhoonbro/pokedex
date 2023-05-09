import { signOut,
    onAuthStateChanged,
signOutUser } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConnection";
import { useEffect, useState } from "react";

export default function Detail() {
    const [user, setUser] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate();

    useEffect(() =>{
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if(user){
                    //logado
                    setUser(true);
                    setUserDetails({
                        uid: user.uid,
                        email: user.email
                    })
                    
                }else{
                    //nao logado
                    setUser(false);
                    setUserDetails({});
                    navigate('/Login', {replace: true})
                }
            })
        }
        checkLogin();
    },[])
    async function signOutUser() {
        await signOut(auth);
        setUser(false);
        setUserDetails({});
    }



    return(
        <div className="Detail">
            <div className="container">
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><p>{userDetails.email}</p></li>
                    <li className="list-group-item"><p>{userDetails.uid}</p></li>
                    <button onClick={signOutUser} className="btn btn-primary">Sair</button>
                </ul>
            </div>
            </div>
            
        </div>
    )
}