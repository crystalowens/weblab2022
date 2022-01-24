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
    const [timeLeft, round, isInGame, gameStateDispatch] = useGameState({onNewRound : newNfts, isLoggedIn : () => !!userId});

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
                    onCorrect = {onCorrect} onFailure={onFailure}
                    isStart = {!isInGame} onStart={onStart} onRestart={onRestart}/>
                <HowToPlay cname="HowToPlay"/>
            </div>
        </Page>
    );
}

const GameStage = (props) => {
    return (
        <div className="GameStage">
            {!props.isInGame && (<StartTransition onClick={props.onStart}/>)}
            <GameInfo timeLeft={props.timeLeft} score={props.score} onRestart={props.onRestart}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} 
                onCorrect={props.onCorrect} onFailure={props.onFailure}/>
        </div>
    );
}

const GameInfo = ({timeLeft, score, onRestart}) => {
    return (
        <div className = "GameInfo">
            <Timer timeLeft={timeLeft}/>
            <Restart cname = "RestartButton" onRestart={onRestart}/>
            <Score cname = "Score" score={score}/>
        </div>
    );
}


export default Game;