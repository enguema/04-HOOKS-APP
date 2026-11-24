import { useEffect, useState } from "react";

interface Props {
    id: number;
}

//Tipamos la informacion que vamos a necesitar
interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

export const usePokemon = ({ id }: Props) => {
    const[pokemon, setPokemon] = useState<Pokemon | null>(null);
    const[isloading, setIsLoading] = useState(false);

    const getPokemonById= async (id: number)=>{
        const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data= await response.json();//Formateamos a JSON

        setPokemon({
            id: data.id,
            name: data.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        })
        setIsLoading(false);
    }

    useEffect(()=>{
        getPokemonById(id);
    }, [id])

    return{
        //Props
        pokemon,
        isloading,
        formatedId: id.toString().padStart(3, "0") //Formateamos el ID para que tenga 3 dígitos
    }
}