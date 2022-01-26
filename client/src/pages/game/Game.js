import React, { useContext, useEffect, useState } from "react";
import Page from "../default-page/Page.js";
import Images from "./components/Images.js";

import useGameState from "./useGameState";
import useNfts from "./useNfts.js";

import HowToPlay from "./components/cards/HowToPlay.js";
import Start from "./components/cards/Start.js";
import Restart from "./components/cards/Restart.js";
import Timer from "./components/cards/Timer.js"; 
import Score from "./components/cards/Score.js"; 
import useWindowSize from "./useWindowSize.js";

import "./Game.css";
import { UserIdContext } from "../../contexts/UserIdContext.js";
import StartTransition from "./StartTransition.js";

const Game = () => {
    const [width, height] = useWindowSize();
    const {userId} = useContext(UserIdContext);
    const [leftNft, rightNft, newNfts] = useNfts();
    const [hasStarted, setHasStarted] = useState(false);
    const [shouldFlash, setShouldFlash] = useState(true);
    const [timeLeft, round, isInGame, setTimerActivated, gameStateDispatch] = useGameState({onNewRound : newNfts, isLoggedIn : () => !!userId});

    const setPauseState = (shouldPause) => { setTimerActivated(!shouldPause); }
    const onStart = () => { gameStateDispatch({type:"start"}); }
    const onRestart = () => { 
        if(!hasStarted) return;
        if(isInGame) { 
            gameStateDispatch({type:"end"}).then(() => {
                gameStateDispatch({type:"start"}); 
                setShouldFlash(true);
            });
        } else{
            gameStateDispatch({type:"start"});
            setShouldFlash(true);
        }
    }

    const onCorrect = () => { if(isInGame) { gameStateDispatch({type:"nextRound"}); }}
    const onFailure = () => { if(isInGame) { gameStateDispatch({type:"end"}); }}

    useEffect(()=> { return () => { gameStateDispatch({type:"end"}); }}, []);;
    useEffect(()=> { if(isInGame){ setHasStarted(true);} }, [isInGame]);

    return (
        <Page>
            <div className="Game">
                <GameStage timeLeft ={timeLeft} score = {round} hasStarted = {hasStarted} shouldFlash = {shouldFlash}
                    leftNft = {leftNft} rightNft = {rightNft} 
                    onCorrect = {onCorrect} onFailure={onFailure} setPauseState = {setPauseState}
                    isInGame = {isInGame} onStart={onStart} onRestart={onRestart}/>
                { (width <= 900 ?  (<></>) : <HowToPlay cname="HowToPlay"/>) }
            </div>
        </Page>
    );
}

const GameStage = (props) => {
    return (
        <div className={`GameStage ${props.hasStarted ? '' : 'HideOverflow'}`}>
            <StartTransition onClick={props.onStart}/>
            <GameInfo timeLeft={props.timeLeft} score={props.score} onRestart={props.onRestart} isInGame = {props.isInGame} hasStarted = {props.hasStarted} shouldFlash = {props.shouldFlash}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} isInGame = {props.isInGame} timeIsZero = {props.timeLeft == 0}
                onCorrect={props.onCorrect} onFailure={props.onFailure} setPauseState = {props.setPauseState}/>
        </div>
    );
}

const GameInfo = ({timeLeft, score, onRestart, isInGame, hasStarted, shouldFlash}) => {
    return (
        <div className = "GameInfo">
            <Timer timeLeft={timeLeft}/>
            <Restart cname={!isInGame && hasStarted && shouldFlash ? "RestartButton Highlight": "RestartButton"} onRestart={onRestart}/> 
            <Score cname = "Score" score={score} isInGame = {isInGame}/>
        </div>
    );
}


export default Game;