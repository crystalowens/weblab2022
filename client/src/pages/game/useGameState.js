import React from "react";
import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import { addToScore, finishGame, createGame } from "../../services/gameSession.js";

function useGameState({onNewRound, isLoggedIn}){
    const [round, setRound] = useState(0);
    const [isInGame, setIsInGame] = useState(false);
    const [timeLeft, resetTimer, setTimerActivated] = useTimer({onZero : () => { end(); }, time : 10});

    const initializeRound = () => {
        setTimerActivated(false);
        resetTimer();
        onNewRound().then(() => {
            setTimerActivated(true);
        });
    }
    
    const start = async () => {
        if(isLoggedIn()){
            return createGame().then(async () => {
                await initializeRound();
                setIsInGame(true);
                setRound(0);
            });
        }
        else{
            await initializeRound();
            setIsInGame(true);
            setRound(0);
            return Promise.resolve(undefined);
        }
    }
    const nextRound = async () => {
        await initializeRound();
        setRound(round => round + 1);
        if(isLoggedIn()) 
            return addToScore(1);
        return Promise.resolve(undefined);
    }
    const end = () => {
        setTimerActivated(false); 
        setIsInGame(false);
        if(isLoggedIn()) 
            return finishGame();
        return Promise.resolve(undefined);
    }
    function dispatch(action){
        switch(action.type){
            case "start":
                return start();
            case "end":
                return end();
            case "nextRound":
                return nextRound();
        }
    }

    return [timeLeft, round, isInGame, setTimerActivated, dispatch];
}

export default useGameState;