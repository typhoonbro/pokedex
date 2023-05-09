import { useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth'
import {db,auth} from '../../firebaseConnection'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Auth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [user, setUser] = useState(false);
    const [userDetails, setUserDetails] = useState({})
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
                    navigate('/', {replace: true})
                }else{
                    //nao logado
                    setUser(false);
                    setUserDetails({});
                }
            })
        }
        checkLogin();
    },[])
    async function newUser(e){
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            toast.success('Usuário cadastrado com sucesso!');
            console.log('sucesso');
            setEmail('');
            setSenha('');
            navigate('/', {replace: true})
        })
        .catch(async function(error)  {
            if(error.code === 'auth/email-already-in-use'){
                await signInWithEmailAndPassword(auth, email, senha)
                .then((resp) => {
                    setUserDetails({
                        uid: resp.user.uid,
                        email: resp.user.email
                    })
                    setUser(true);
                    setEmail('');
                    setSenha('');
                    navigate('/', {replace: true})
                })
                .catch((error)=> {
                    toast.error(error)
                    setEmail('');
                    setSenha('');
                })
            }else if (error.code === 'auth/weak-password') {
                toast.warn('Senha deve conter pelo menos 6 caracteres')
            }
        })
    }
    async function signOutUser() {
        await signOut(auth);
        setUser(false);
        setUserDetails({});
    }
    return(
        <div className="Auth">
            <div className="container">

                <h2 className="text-center">Cadastro/Login</h2>
                <form onSubmit={(e) => {newUser(e)}}>
                    <label className="form-label">Email</label>
                    <input className="form-control"
                        value={email}
                        required
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />    
                    <label className="form-label">Senha</label>
                    <input className="form-control"
                        value={senha}
                        required
                        onChange={(e)=>{setSenha(e.target.value)}}
                        type="password"
                        
                    />
                    <p className="form-text">A senha deve conter no mínimo 6 caracteres</p>
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Cadastrar/Logar
                    </button>
                </form>
                
            </div>
        </div>
    )
}
export default Auth;