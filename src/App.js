import { useEffect, useState } from "react";
import ImagenPokemon from "./components/ImagenPokemon";
import axiosClient from "./config/AxiosClient";
import PokemonContext from "./context/PokemonContext";

function App() {
  const [imagenUrl,setImagenUrl] = useState();  
  const [pokemons,setPokemons] = useState({});
  
  const obtenPokemones=()=>{
    axiosClient.get('/api/v2/pokemon?offset=20&limit=100')
      .then(res =>{
        setPokemons(res.data.results);
      });
  };

  useEffect(()=>{
    obtenPokemones();
  },[]);

  const buscarPokemon = (name) => {
    console.log("/api/v2/ability/");
    fetch("/api/v2/pokemon/" + name)
      .then((response) => response.json())  
      .then((pok) =>  setImagenUrl(imagenUrl===pok.sprites.back_shiny?pok.sprites.front_shiny :pok.sprites.back_shiny));
  }
  
  return (
    <>
    <PokemonContext.Provider value={imagenUrl}>
      <ImagenPokemon alt="Imgen demo" />
    </PokemonContext.Provider>
        {console.log(pokemons)}
        {Object.keys(pokemons).map((pokemon)=>(
          <li key={pokemon} id={pokemon} onClick={(e)=>{
            buscarPokemon(pokemons[e.currentTarget.id].name);
          }}>{pokemons[pokemon].name}</li>
        ))}
   
  </>
  );

}

export default App;
