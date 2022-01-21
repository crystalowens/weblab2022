import React from "react";
import { useEffect, useState } from "react";

function useTimer({onZero}) {
    const [timeLeft, setTimeLeft] = useState(10);
    const [timerActivated, setTimerActivated] = useState(false);

    useEffect(() => {
        if(timeLeft === 0 || !timerActivated) return;
        const timeout = setTimeout(() => {
            if(timerActivated){
                if(timeLeft !== 0) {
                    setTimeLeft(timeLeft => timeLeft - 1);
                }else if(timeLeft === 0){
                    clearTimeout(timeout);
                    onZero();
                }
            }
        }, 1000);
        return () => {clearTimeout(timeout);};
    }, [timeLeft, timerActivated]);

    return [timeLeft, () => setTimeLeft(10), setTimerActivated];
}

export default useTimer;