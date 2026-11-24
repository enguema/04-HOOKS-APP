import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 aniamate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
}

//Creamo sun tipo personalizado de data
type TrafficLightColor = "red" | "yellow" | "green";

export const TrafficLightWithEffect = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");

  const [countdown, setCountdown] = useState(5);

  //------ 1. Efecto CountDown
  useEffect(() => {
    if (countdown == 0) return;

    //setIntervale: Ejecuta una función repetidamente con un retraso fijo entre cada llamada. 
    // En este caso, se ejecuta cada 1000 milisegundos (1 segundo) y decrementa el estado de countdown en 1.
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000);

    return () => {
      //Sin la función de limpieza, el setInterval seguiría ejecutándose aunque el componente se desmonte, 
      // //lo que podría causar problemas de rendimiento o errores si intenta actualizar el estado de un componente que ya no existe.
      clearInterval(interval);
    }
  }, [countdown]);

  //------ 2. Change Light color Effect
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(5);
      if (light == 'red') {
        setLight("green");
        return
      }

      if (light == 'green') {
        setLight("yellow");
        return
      }

      if (light == 'yellow') {
        setLight("red");
        return
      }
    }
  }, [countdown, light]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">

        <h1 className="text-white text-3xl font-thin">Semaforo con useEffect</h1>
        <h2 className="text-white text-xl">Countdown: {countdown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}

          ></div>
        </div>

        <div className={`w-32 h-32 ${light === "red" ? colors[light] : "bg-gray-500"} rounded-full`}></div>

        <div className={`w-32 h-32 ${light === "yellow" ? colors[light] : "bg-gray-500"} rounded-full`}></div>

        <div className={`w-32 h-32 ${light === "green" ? colors[light] : "bg-gray-500"} rounded-full`}></div>
      </div>
    </div>
  );
};