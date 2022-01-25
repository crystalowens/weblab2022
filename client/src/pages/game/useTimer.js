import React from "react";
import { useEffect, useState } from "react";

function useTimer({onZero, time}) {
    const [timeLeft, setTimeLeft] = useState(time);
    const [timerActivated, setTimerActivated] = useState(false);
    useEffect(() => {
        if(!timerActivated) return;
        if(timeLeft === 0) {
            onZero(); setTimerActivated(false);
            return;
        }
        const timeout = setTimeout(() => {
            if(timerActivated){
                if(timeLeft !== 0) {
                    setTimeLeft(timeLeft => timeLeft - 1);
                }else if(timeLeft == 0){
                    clearTimeout(timeout);
                }
            }
        }, 1000);
        return () => {clearTimeout(timeout);};
    }, [timeLeft, timerActivated]);

    return [timeLeft, () => setTimeLeft(time), setTimerActivated];
}

export default useTimer;