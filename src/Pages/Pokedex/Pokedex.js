import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { db } from '../../firebaseConnection';
import { toast } from 'react-toastify';

function PokedexPage() {
    const imgLinkBase = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/';
    const shinyBaseUrl = 'https://img.pokemondb.net/sprites/home/shiny/2x/';
    const [currentPage, setCurrentPage] = useState(1);
    const P = new Pokedex();
    const [list, setList] = useState(['']);
    const [poke, setPoke] = useState('');

    // const [spriteUrl, setSpriteUrl] = useState(['']);
    const userLocal = JSON.parse(localStorage.getItem('detailUser'));
    useEffect(() => {

        async function loadPokemon() {
       
       
            const apiParams = {
                limit: 20,
                offset: 0
            }
            // P.getPokemonFormsList(apiParams)
            P.getPokemonsList(apiParams)
            .then((response) => {
                console.log(response.results);
                const pokemons = response.results
                setList(pokemons);
                
                
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
                console.log(response.results);
                const pokemons = response.results
                setList([...list, ...pokemons])
            })
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
        
      
    }
       function handleAdd(id) {
        setPoke(id);
        console.log(poke);
      }
      async function registerCapture(pokeid) {
        await addDoc(collection(db, 'shinydex'), {
            pokemon: pokeid,
            created: new Date(),
            userUID: userLocal?.uid
        }).then(() => {
            toast.success('Registrado com sucesso')
        }).catch(() => {
            toast.warn('Erro')
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
                                if(item){
                                    let url = item.url;
                                    
                                    let id = url.slice(34);
                                    
                                    let idR = id.replaceAll('/','');
                                    let lengthId = idR.length;
                                    var idP = '';
                                if( lengthId < 3 ) {
                                     idP = idR.padStart(3,0);
                                } else {
                                     idP = idR;
                                }
                                return(
                                    <li id={idP}  key={idP} className='list-group-item'>
                                        <div className='row'>
                                            <div className='col-sm-12 col-md-4 d-flex align-center flex-column'>
                                                <img src={imgLinkBase+idP+'.png'}></img>
                                                <img src={shinyBaseUrl+item.name+'.jpg'}></img>
                                            </div>
                                            <div className='info col-sm-12 col-md-8 d-flex align-start flex-column'>
                                            <p className='h2 pokemon-name'>{`${item.name}`}</p>
                                            <p className=''>National dex nº:  
                                                <strong>
                                                {` ${idP}`}
                                                </strong>
                                            </p>
                                            </div>
                                        
                                        </div>
                                      <button type='button' onClick={() => {
                                       
                                       registerCapture(idP)
                                      }} className='btn btn-primary'>
                                        Registrar como obtido
                                      </button>
                                        
                                    </li>
                                )

                                } else {
                                    return
                                }
                               
                            
                            
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
export default PokedexPage;