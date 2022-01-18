import React, { useState, useEffect, useContext } from "react";
import "./GameContent.css";
import nft1 from "../../../images/bored-ape-1.jpg";
import nft2 from "../../../images/bored-ape-2.jpg";
import { get } from "../../utilities"
import {startGame, endGame, addToScore} from "../../apicalls/gameScore.js";
import { UserIdContext } from "./UserIdContext";
import Rules from "./Rules.js";
import GameImages from "./GameImages.js";
import GameTimer from "./GameTimer.js"; 

const ImageContainer = (props) => {
    let cssSize = null;
    if(props.size == null) cssSize = {width: '300px', height: '300px'};
    else cssSize = {width: props.width, height: props.height};
    return (
        <div className="ImageContainer">
            <img className="ImageContainer-image" style = {cssSize} src={props.src}/>;
            <p className="ImageContainer-title">{props.title}</p>
            <p className="ImageContainer-description">{props.description}</p>
        </div>
    );
}

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
                <GameImages/>
                {/* <div className = "GameTimer YellowBorder">Time remaining: {gameTimer} </div> */}
                <div>
                <GameTimer gameTimer={gameTimer}
                onClick = {countDown}
                />
                </div>
            </div>
            <Rules className="RuleCard"/>
            <div className = "ScoreCard YellowBorder">
                <div>Score: {gameScore} </div>
            </div>
        </div>
    );
}

export default GameContent;