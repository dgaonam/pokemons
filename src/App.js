import { useEffect, useState } from "react";
import ImagenPokemon from "./components/ImagenPokemon";
import axiosClient from "./config/AxiosClient";
import PokemonContext from "./context/PokemonContext";

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [imagenUrl, setImagenUrl] = useState();
  const [pokemons, setPokemons] = useState({});
  const [paginas, setPaginas] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);

  const obtenPokemones = () => {
    axiosClient.get('/api/v2/pokemon?offset=' + (currentPage * recordsPerPage) + '&limit=' + recordsPerPage)
      .then(res => {
        setPaginas(Math.ceil(res.data.count / recordsPerPage));
        setPokemons(res.data.results);
      });
  };

  useEffect(() => {
    obtenPokemones();
  }, []);

  useEffect(() => {
    console.log("se actualiza lista de pokemons");
  }, [pokemons]);

  useEffect(() => {
    console.log("current page");
    obtenPokemones();
  }, [currentPage]);

  const buscarPokemon = (name) => {
    fetch("/api/v2/pokemon/" + name)
      .then((response) => response.json())
      .then((pok) => setImagenUrl(imagenUrl === pok.sprites.front_shiny ? pok.sprites.back_shiny : pok.sprites.front_shiny));
  }

  const siguientePagina = () => {
    if (currentPage !== paginas) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage);
    }
  }
  const anteriorPagina = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      console.log(currentPage);
    }
  }
  const selectPagina = () => {
    console.log(currentPage);
  }

  const pageNumbers = [...Array(paginas + 1).keys()].slice(1)

  return (
    <>
      <PokemonContext.Provider value={imagenUrl}>
        <ImagenPokemon alt="Imgen demo" />
      </PokemonContext.Provider>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#" onClick={anteriorPagina}>Anterior</a></li>
          {pageNumbers.map((pagina) => (
            <li key={pagina} className="page-item"><a className="page-link" href="#" id={pagina} onClick={(event) => {
              setCurrentPage(event.currentTarget.id)
            }}>{pagina}</a></li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={siguientePagina}>Siguiente</a></li>
        </ul>
      </nav>
      <ul className="list-group list-group-numbered">
        {Object.keys(pokemons).map((pokemon) => (
          <li className="list-group-item" key={pokemon} id={pokemon} onClick={(e) => {
            buscarPokemon(pokemons[e.currentTarget.id].name);
          }}>{pokemons[pokemon].name}</li>
        ))}
      </ul>

    </>
  );

}

export default App;
