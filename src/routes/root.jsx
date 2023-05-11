import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import Pokeball from '../pokeball.png' ;
import {db,auth} from '../firebaseConnection';
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";


function Root() {

    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [menuLogin, setMenuLogin] = useState(true);
    const [menuLogado, setMenuLogado] = useState(false)
    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if(user){
                    //logado
                    setUser(true);
                    setUserDetails({
                        uid: user.uid,
                        email: user.email
                    })
                    setMenuLogin(false);
                    setMenuLogado(true);
                    
                }else{
                    //nao logado
                    setUser(false);
                    setUserDetails({});
                }
            });
            
        }
        checkLogin();
    },[])

    return (
        <div>
           
           

            <nav class="navbar navbar-expand-lg bg-light sticky-top">
                <div class="container-fluid row">
                    <div className="menu-toggler">
                        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
                            <span className="navbar-toggler-icon"></span>
                        </button>  
                    </div>
                   
                    <div className="col text-center">
                    <Link to={`/`} className="navbar-brand">
                        <img src={Pokeball} alt="Home" />
                    </Link>
                    </div>
                </div>
            </nav>





            <div className="offcanvas offcanvas-start bg-dark" tabIndex='-1' id="sidebarMenu">
                    <div className="offcanvas-header">
                        <h5 class="offcanvas-title text-light" id="offcanvasExampleLabel">Menu</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        
                        
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <NavLink to={`/`} className={({ isActive }) =>
                            isActive
                            ? 'nav-link active'
                            
                            : 'nav-link'
                        
                        }><p data-bs-dismiss='offcanvas'>Home</p></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to={`Pokedex`} className={({isActive})=>
                        isActive
                        ? 'nav-link active'
                        : 'nav-link '
                        
                        }><p data-bs-dismiss='offcanvas'>Pokedex</p></NavLink>
                        </li>
                        
                        { menuLogin && (
                            <li class="nav-item">
                            <NavLink to={`Login`} className={({isActive})=>
                            isActive
                            ? 'nav-link active'
                            : 'nav-link '
                            
                            }><p data-bs-dismiss='offcanvas'>Cadastro/Login</p></NavLink>
                            </li>
                        )

                        }
                        { menuLogado && (
                            <li class="nav-item">
                            <NavLink to={`Detail`} className={({isActive})=>
                            isActive
                            ? 'nav-link active'
                            : 'nav-link '
                            
                            }><p data-bs-dismiss='offcanvas'>Acesse sua conta</p></NavLink>
                            </li>
                        )}
                        
                    
                    </ul>
                    
                </div>
            </div>
            <div id='App'>
                <ToastContainer autoClose={4000} />
                <Outlet/>
            </div>
        </div>
      );
}
export default Root;