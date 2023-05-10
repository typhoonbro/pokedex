import { signOut,
    onAuthStateChanged,
signOutUser } from "firebase/auth"
import Pokedex from 'pokedex-promise-v2';
import { addDoc, 
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    deleteDoc,
    where} from 'firebase/firestore'
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../firebaseConnection";
import { useEffect, useState } from "react";
import { trimURLForImg } from "../Pokedex/Pokedex";
import { toast } from "react-toastify";

export default function Detail() {
    const imgLinkBase = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/';
    const shinyBaseUrl = 'https://img.pokemondb.net/sprites/home/shiny/2x/';
    const [user, setUser] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate();
    const [shinydexList, setshinydexList] = useState([]);
    const userLocal = JSON.parse(localStorage.getItem('detailUser'));
    const P = new Pokedex();

    function trimURL(id) {
        let idP = '';
        if( id < 3 ) {
            idP = id.padStart(3,0);
       } else {
            idP = id;
       }
       return idP;
    }




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
    useEffect(() => {
        async function getShinyPokemon() {
       
            const data = userLocal;

            const shinyList = collection(db, 'shinydex')
            const q = query(shinyList, orderBy('created','desc'), where('userUID','==', data?.uid));

             onSnapshot(q,(snapshot) => {
                const listaPokemonsDetail = [];
                snapshot.forEach((doc) => {
                    const resource = 'api/v2/pokemon/';
                    const resourName = resource+doc.data().pokemonId;
                    
                    P.getResource(resourName) 
                            .then((response) => {
                                // console.log(response)
                                
                                listaPokemonsDetail.push({
                                    Id: doc.id,
                                    pokemonId: response.id,
                                    pokemonName: response.species.name,
                                    pokemonStringId: trimURL(JSON.stringify(response.id)),
                                })
                                setshinydexList(listaPokemonsDetail)
                                
                            })
                    
                            .catch((error) => {
                                console.log(`Error: ${error}`)
                    }) 
                })
                
            })
            
      }
    getShinyPokemon();

    },{})

    async function signOutUser() {
        await signOut(auth);
        setUser(false);
        setUserDetails({});
        localStorage.removeItem('detailUser');
    }
    async function deletePoke(id) {
        const docRef = doc(db,'shinydex',id);
        await deleteDoc(docRef)
        .then(() =>{
            toast.success('Pokemon removido com sucesso')
            
        })
        .catch((err) => {
            toast.warn(`Erro: ${err}`)
        })
    }


    return(
        <div className="Detail">
            <div className="container">

            <div className="card">
                <ul className="list-group list-group-flush user">
                    <li className="list-group-item"><p>{userDetails.email}</p></li>
                    <li className="list-group-item"><p>{userDetails.uid}</p></li>
                </ul>

            </div>
            <button onClick={signOutUser} className="btn btn-primary mt-3">Sair</button>


                <div className="Shinydex-list">
                    <ul className='list-group'>
                       
                        {shinydexList.map((item) => { 
                               
                               
                                return(
                                    <li id={item.pokemonId}  key={item.pokemonId} className='list-group-item'>
                                        <div className='row'>
                                            
                                            <div className='info col-sm-12 col-md-8 d-flex align-start flex-column'>
                                            <p className='h2 pokemon-name'>{`${item.pokemonName}`}</p>
                                            <p className=''>National dex nº:  
                                                <strong>
                                                {` ${item.pokemonId}`}
                                                </strong>
                                            </p>
                                            <div>
                                            <button onClick={() => deletePoke(item.Id)} className="btn btn-warning">Excluir</button>
                                            </div>
                                            </div>
                                            <div className='image col-sm-12 col-md-4 d-flex align-center text-center'>
                                                
                                                <img src={shinyBaseUrl+item.pokemonName+'.jpg'}></img>
                                            </div>
                                        </div>
                                    
                                        
                                        
                                    </li>
                                )

                               
                               
                            
                            
                        })}
                       
                    </ul>
                </div>
            </div>
        </div>
    )
}