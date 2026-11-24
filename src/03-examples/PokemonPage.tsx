import { useCounter } from "../Hooks/useCounte";
import { usePokemon } from "../Hooks/usePokemon";

export const PokemonPage = () => {

    const{ counter, increment, decrement } = useCounter();
    const { pokemon, isloading, formatedId } = usePokemon({ id: counter });

    if(isloading){
      return(
        <div className="bg-gradiente flex flex-col items-center">
          <h1 className="text-2xl font-thin text-white">Pokémon</h1>
          <h3 className="text-xl font-bold text-white">Cargando...</h3>
        </div>
      )
    }

    {/*if(!pokemon){
      return(
        <div className="bg-gradiente flex flex-col items-center">
          <h1 className="text-2xl font-thin text-white">Pokémon</h1>
          <h3 className="text-xl font-bold text-white">No se encontró el Pokémon</h3>
        </div>
      )
    }*/}

  return (
    <div className="bg-gradiente flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">#{formatedId} {pokemon?.name || "Cargando..."}</h3>
      <img
        src={pokemon?.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${counter}.png`}
        alt={pokemon?.name || "Pokémon"}
      />
      <div className="flex gap-2">
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={decrement}
        >
          Anterior
        </button>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={increment}
        >
          Siguiente
        </button>
       
      </div>
    </div>
  );
};