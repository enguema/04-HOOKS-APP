import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 aniamate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
}

type TrafficLightColor = "red" | "yellow" | "green";

export const useTrafficLight = () => {
    const [countdown, setCountdown] = useState(5);
    const [light, setLight] = useState<TrafficLightColor>("red");

    //------ 1. Efecto CountDown
    useEffect(() => {
        if (countdown == 0) return;

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000);

        return () => {
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

    return {
        //Props
        countdown,
        light,
        colors,

        //Functions

        //computed
        percentage: (countdown / 5) * 100,
        greenLight: light == "green" ? colors.green : "bg-gray-500",
        yellowLight: light == "yellow" ? colors.yellow : "bg-gray-500",
        redLight: light == "red" ? colors.red : "bg-gray-500",
    }
}