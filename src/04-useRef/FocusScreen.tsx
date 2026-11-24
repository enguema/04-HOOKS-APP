import { useRef } from "react";

export const FocusScreen = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onClick=()=>{
        console.log(inputRef.current?.value);
        inputRef.current?.select(); //Seleccionamos el texto del input
        //inputRef.current?.focus(); //Ponemos el foco en el input
    };

    return(
        <div className="bg-gradiente flex flex-col items-center">
            <h1 className="text-2xl font-thin text-white">Focus Screen</h1>
            <input 
                ref={inputRef}
                type="text" 
                className="bg-white text-black px-4 py-2 rounded-md"
                autoFocus
            />


            <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                Set Focus
            </button>
        </div>
    )
}