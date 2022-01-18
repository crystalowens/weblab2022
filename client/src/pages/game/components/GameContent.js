import React, { useState, useEffect, useContext } from "react";
//CARDS
import Rules from "./cards/HowToPlay.js";
import Images from "./cards/Images.js";
//GENERIC COMPONENTS
import Timer from "../../../components/timer/Timer.js"; 
//SERVICES
import {startGame, endGame, addToScore} from "../../../services/gameSession.js";
//CONTEXT
import { UserIdContext } from "../../../contexts/UserIdContext.js";
//CSS
import "./GameContent.css";

const GameContent = (props) => {
    const {userId} = useContext(UserIdContext);
    const [gameScore, setGameScore] = useState(0); 
    const incrementScore = () => {
        setGameScore(gameScore + 1); 
        addToScore(1);
        console.log(gameScore);
    }
    const checkGuess = () => {
        // Figure out if they're right or not
        // update score
        // game over or generate new image set 
    }
    const [gameTimer, setGameTimer] = useState(10);

    const countDown = () => {
        setGameTimer(gameTimer - 1); 
        console.log(gameTimer);
    }
    
    useEffect(() => {
        startGame();
        console.log('Game score:', gameScore);
      }, []);
    
    return (
        <div className="GameContent-container">
            <div>
                <Timer timeLeft={gameTimer} onClick = {countDown}/>
                <Images/>
            </div>
            <Rules className="RuleCard"/>
            <div className = "ScoreCard YellowBorder">
                <div>Score: {gameScore} </div>
            </div>
        </div>
    );
}

export default GameContent;