import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import {
    addDoc, 
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from 'firebase/firestore';
import { db } from '../../firebaseConnection';
import { toast } from 'react-toastify';


function trimUrlForShinyListBanco(item) {
    if(item){
        let url = item.url;
        
        let id = url.slice(34);
        
        let idR = id.replaceAll('/','');
        return idR
    }
   
}
function trimURLForImg(item) {
    if(item){
        let url = item.url;
        //indice da ultima barra, e dai slice TODO
        let id = url.slice(34);
        
        let idR = id.replaceAll('/','');
        let lengthId = idR.length;
        var idP = '';
    
         idP = idR.padStart(3,0);
    
    }
    return idP
}

function PokedexPage() {
    const imgLinkBase = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/';
    const shinyBaseUrl = 'https://img.pokemondb.net/sprites/home/shiny/2x/';
    const [currentPage, setCurrentPage] = useState(1);
    const P = new Pokedex();
    const [list, setList] = useState(['']);
    const [poke, setPoke] = useState('');

    const [shinydexList, setshinydexList] = useState(['']);
    const userLocal = JSON.parse(localStorage.getItem('detailUser'));
    useEffect(() => {

        async function loadPokemon() {
       
            
            const apiParams = {
                limit: 20,
                offset: 0
            }
            // P.getPokemonFormsList(apiParams)
           await P.getPokemonsList(apiParams)
            .then((response) => {
                const pokemons = response.results
                setList(pokemons);
                
                if(userLocal){
                    const data = userLocal;

                    const shinyList = collection(db, 'shinydex')
                    const q = query(shinyList, orderBy('created','desc'), where('userUID','==', data?.uid));

                    const subbed = onSnapshot(q,(snapshot) => {
                        let list = [];
                        snapshot.forEach((doc) => {
                            list.push({
                                id: doc.id,
                                pokemonStringId: doc.data().pokemonStringId,
                                pokemonId: doc.data().pokemonId,
                                pokemonName: doc.data().pokemonName,
                                userUID: doc.data().userUID
                            })
                            
                        setshinydexList(list)
                    })
                    
                })
                }
            })
       
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
        
      
      }
      loadPokemon();
      
    }, []);
    async function loadMorePokemon() {
       
            setCurrentPage(old => old + 1)
            const apiParams = {
                limit: 20,
                offset: 20 * currentPage
            }
            P.getPokemonsList(apiParams)
            .then((response) => {
                
                const pokemons = response.results
                setList([...list, ...pokemons])
            })
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
        
      
    }
    async function deleteFromShinylist() {
        return
    }
    
    function filterItems(arr, query) {
        let item = []
        arr.forEach((dc) => {
            if(dc.pokemonStringId === query) {
                item.push(dc);
            }
        })
        return(item)
      

    }
    function showButton(bool, id, idBanco, namePoke, pokeURL){
        if(bool.length > 0) {
            return(
                <p className='h5'>Forma shiny obtida</p>
            )
        } else {
            return(
                <button type='button' onClick={() => {
                                
                    registerCapture(id, idBanco, namePoke, pokeURL)
                }} className='btn btn-primary'>
                    Registrar como obtido
                </button>
            )
        }
    }
    async function registerCapture(pokeid, pokeidbanco, pokename, pokeURL) {
        await addDoc(collection(db, 'shinydex'), {
            pokemonStringId: pokeid,
            created: new Date(),
            userUID: userLocal?.uid,
            pokemonId: pokeidbanco,
            pokeName: pokename,
            pokeURL: pokeURL
        }).then(() => {
            toast.success('Registrado com sucesso')
        }).catch((err) => {
            toast.warn(`Erro: ${err}`)
        })
      }
    
    return(
        <div className="Pokedex container">
            <div className='title-holder'>
                <h1  className="text-center">{`Pokedex `}</h1>            
            </div>
            <div className="content-container">
                {/* <div className="title-container">
                    <h4 className="text-center"></h4>
                </div> */}
                <div  className="list-container">
                    <ul  className='list-group'>
                    
                        {list.map((item) => { 
                                let idP = trimURLForImg(item);
                                let idB = trimUrlForShinyListBanco(item);
                                var namePoke = JSON.stringify(item.name);
                                let pokeURL = item.url;
                                const esseItemNaShinydex = filterItems(shinydexList, idP);
                                return(
                                    <li id={idP}  key={idP} className='list-group-item'>
                                        <div className='row'>
                                            
                                            <div className='info col-sm-12 col-md-8 d-flex align-start flex-column'>
                                            <p className='h2 pokemon-name'>{`${item.name}`}</p>
                                            <p className=''>National dex nº:  
                                                <strong>
                                                {` ${idP}`}
                                                </strong>
                                            </p>
                                            <div>
                                            {showButton(esseItemNaShinydex, idP, idB, namePoke, pokeURL)}
                                            </div>
                                            </div>
                                            <div className='image col-sm-12 col-md-4 d-flex align-center text-center'>
                                                <img src={imgLinkBase+idP+'.png'}></img>
                                                <img src={shinyBaseUrl+item.name+'.jpg'}></img>
                                            </div>
                                        </div>
                                    
                                        
                                        
                                    </li>
                                )
                        })}
                    </ul>
                    <div className='container'>
                        <button type='button' className='btn btn-primary' onClick={loadMorePokemon} >Carregar mais</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export  {PokedexPage, trimURLForImg, trimUrlForShinyListBanco};