import { useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

//react memo: memoriza un componente, si sus props no cambian, no se vuelve a renderizar
export const MemoHook = () => {
    const [title, setTitle] = useState('Mi título');
    const [subTitle, setSubTitle] = useState('Mi subtítulo');

     const handleMyAPICall = ()=>{
        console.log('Calling MyAPI');
     }
    
    return (
        <div className="bg-gradiente flex flex-col gap-4 text-center">
            <h1 className="text-2xl font-white">Memo Hook</h1>

            <MyTitle title={title} />

            <MySubTitle subtitle={subTitle} callMyAPI={handleMyAPICall} />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setTitle('Mi nuevo título,' + new Date().getTime())}
            >
                Cambiar titulo
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setSubTitle('Mi nuevo subtítulo')}
            >
                Cambiar subtitulo
            </button>
        </div>
    );
};