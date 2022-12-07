import React from "react";
import usePokemon from "../hooks/usePokemon";

const ImagenPokemon =({alt="",onCustomError =()=>null}) =>{
    const imagenUrl = usePokemon();
    
    return(<img style={{height:200, width: 200}} alt={alt} src={imagenUrl} onError={onCustomError} />);
};

export default ImagenPokemon;