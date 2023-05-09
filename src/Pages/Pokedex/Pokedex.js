import Pokedex from 'pokedex-promise-v2';
import { useState, useEffect } from 'react';

function PokedexPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const P = new Pokedex();
    const [list, setList] = useState(['']);
    const [spriteUrl, setSpriteUrl] = useState(['']);
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
            P.getPokemonFormsList(apiParams)
            .then((response) => {
                console.log(response.results);
                const pokemons = response.results
                setList([...list, ...pokemons])
            })
            .catch((error) => {
                console.log(`Error: ${error}`)
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
                                
                                return(
                                    <li   key={item.name} className='list-group-item'>
                                      
                                        <p>{`${item.name}`}</p>
                                        
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
export default PokedexPage;