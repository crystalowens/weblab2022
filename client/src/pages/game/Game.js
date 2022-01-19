import React, { useContext, useEffect, useState } from "react";
import Page from "../default-page/Page.js";

import { getRandomNFT } from "../../services/nft.js";
import { addToScore, finishGame, createGame } from "../../services/gameSession.js";

import HowToPlay from "./components/cards/HowToPlay.js";
import Start from "./components/cards/Start.js";
import Restart from "./components/cards/Restart.js";
import Images from "./components/Images.js";
import Timer from "../../components/timer/Timer.js"; 
import Score from "../../components/score/Score.js"; 

import "./Game.css";
import { UserIdContext } from "../../contexts/UserIdContext.js";

const StartState = ({isStart, onStart, onRestart}) => {
    return (isStart ? 
        (<Start onClick = {onStart}/>) : 
        ((<Restart onClick = {onRestart}/>)
    ));
}

const GameInfo = ({timeLeft, score, isStart, onStart, onRestart}) => {
    return (
        <div className = "GameInfo">
            <Timer reactClassName="Timer" timeLeft={timeLeft}/>
            <StartState isStart = {isStart} onStart={onStart} onRestart={onRestart}/>
            <Score score={score}/>
        </div>
    );
}

const GameStage = (props) => {
    return (
        <div className="GameStage">
            <GameInfo timeLeft={props.timeLeft} score={props.score} 
                isStart = {props.isStart} onStart={props.onStart} onRestart={props.onRestart}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} 
                onCorrect={props.onCorrect} onFailure={props.onFailure}/>
        </div>
    );
}

const Game = () => {
    const {userId} = useContext(UserIdContext);
    const isLoggedIn = () => Boolean(userId); 

    const [leftNft, setLeftNft] = useState(null);
    const [rightNft, setRightNft] = useState(null);

    const [round, setRound] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [timerActivated, setTimerActivated] = useState(false);
    const [isInGame, setIsInGame] = useState(false);

    useEffect(() => {
        if(timeLeft === 0) return;
        setTimeout(() => {
            if(timerActivated) 
                setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
    }, [timeLeft, timerActivated]);

    const newNfts = () => {
        setLeftNft(null); setRightNft(null);
        return Promise.all([
            getRandomNFT().then((nft) => setLeftNft(nft)),
            getRandomNFT().then((nft) => setRightNft(nft))
        ]);
    }    
    
    const initializeRound = () => {
        setTimerActivated(false);
        setTimeLeft(10);
        newNfts().then(() => {
            setTimerActivated(true);
        });
    }

    const start = () => {
        if(isLoggedIn()){
            createGame().then(() => {
                initializeRound();
                setIsInGame(true);
                setRound(0);
            });
        }
        else{
            initializeRound();
            setIsInGame(true);
            setRound(0);
        }

    }
    const nextRound = () => {
        initializeRound();
        setRound(round + 1);
        if(isLoggedIn()) 
            addToScore(1);
    }
    const end = () => {
        setTimerActivated(false); 
        setIsInGame(false);
        if(isLoggedIn()) 
            finishGame();
    }

    //all events that are happening
    const onStart = () => { start(); }
    const onRestart = () => { if(isInGame) { end(); } start(); }
    const onCorrect = () => { if(isInGame) { nextRound(); }}
    const onFailure = () => { if(isInGame) { end(); }}

    useEffect(()=> { return () => { if(isInGame) {end();} }}, []);;
    return (
        <Page>
            <div className="Game">
                <GameStage timeLeft ={timeLeft} score = {round} 
                    leftNft = {leftNft} rightNft = {rightNft}
                    onCorrect = {onCorrect} onFailure={onFailure}
                    isStart = {!isInGame} onStart={onStart} onRestart={onRestart}/>
                <HowToPlay reactClassName="HowToPlay"/>
            </div>
        </Page>
    );
}

export default Game;