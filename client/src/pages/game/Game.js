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

import "./Game.css";
import { UserIdContext } from "../../contexts/UserIdContext.js";
import StartTransition from "./StartTransition.js";

const Game = () => {
    const {userId} = useContext(UserIdContext);
    const [leftNft, rightNft, newNfts] = useNfts();
    const [timeLeft, round, isInGame, setTimerActivated, gameStateDispatch] = useGameState({onNewRound : newNfts, isLoggedIn : () => !!userId});

    const setPauseState = (shouldPause) => { setTimerActivated(!shouldPause); }
    const onStart = () => { gameStateDispatch({type:"start"}); }
    const onRestart = () => { gameStateDispatch({type:"end"}).then(() => gameStateDispatch({type:"start"})) }

    const onCorrect = () => { if(isInGame) { gameStateDispatch({type:"nextRound"}); }}
    const onFailure = () => { if(isInGame) { gameStateDispatch({type:"end"}); }}

    useEffect(()=> { return () => { if(isInGame) {gameStateDispatch({type:"end"});} }}, []);;

    return (
        <Page>
            <div className="Game">
                <GameStage timeLeft ={timeLeft} score = {round} 
                    leftNft = {leftNft} rightNft = {rightNft}
                    onCorrect = {onCorrect} onFailure={onFailure} setPauseState = {setPauseState}
                    isInGame = {isInGame} onStart={onStart} onRestart={onRestart}/>
                <HowToPlay cname="HowToPlay"/>
            </div>
        </Page>
    );
}

const GameStage = (props) => {
    return (
        <div className="GameStage">
            <StartTransition onClick={props.onStart}/>
            <GameInfo timeLeft={props.timeLeft} score={props.score} onRestart={props.onRestart}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} isInGame = {props.isInGame} timeIsZero = {props.timeLeft == 0}
                onCorrect={props.onCorrect} onFailure={props.onFailure} setPauseState = {props.setPauseState}/>
        </div>
    );
}

const GameInfo = ({timeLeft, score, onRestart}) => {
    return (
        <div className = "GameInfo">
            <Timer timeLeft={timeLeft}/>
            {/* <Restart cname = "RestartButton" onRestart={onRestart}/> */}
            <Restart cname={timeLeft > 6 ? "RestartButton EndGame": "RestartButton"} onRestart={onRestart}/> 
{/* here */}
            <Score cname = "Score" score={score}/>
        </div>
    );
}


export default Game;