import React, { useContext, useEffect, useState } from "react";
import Page from "../default-page/Page.js";

import { getRandomNFT } from "../../services/nft.js";
import { addToScore, finishGame, createGame } from "../../services/gameSession.js";

import HowToPlay from "./components/cards/HowToPlay.js";
import Start from "./components/cards/Start.js";
import Restart from "./components/cards/Restart.js";
import Images from "./components/cards/Images.js";
import Timer from "../../components/timer/Timer.js"; 
import Score from "../../components/score/Score.js"; 

import "./Game.css";
import { UserIdContext } from "../../contexts/UserIdContext.js";

const StartState = ({onStart, onRestart}) => {
    //true means we need to start. false means we can restart
    const [startState, setStartState] = useState(true);
    const switchStartState = (callback) => {
        return () => {
            setStartState(startState => !startState);
            callback();
        }
    }
    if (startState) {
        return (<Start onClick = {switchStartState(onStart)}/>);
    }
    else{
        return (<Restart onClick = {switchStartState(onRestart)}/>);
    }
}

const GameInfo = ({timeLeft, score, onStart, onRestart}) => {
    return (
        <div className = "GameInfo">
            <Timer reactClassName="Timer" timeLeft={timeLeft}/>
            <StartState onStart={onStart} onRestart={onRestart}/>
            <Score score={score}/>
        </div>
    );
}

const GameStage = (props) => {
    return (
        <div className="GameStage">
            <GameInfo timeLeft={props.timeLeft} score={props.score} 
                onStart={props.onStart} onRestart={props.onRestart}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} 
                onCorrect={props.onCorrect} onFailure={props.onFailure}/>
        </div>
    );
}

const Game = () => {
    const {userId} = useContext(UserIdContext);
    const [leftNft, setLeftNft] = useState(null);
    const [rightNft, setRightNft] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [round, setRound] = useState(0);
    const [shouldPause, setShouldPause] = useState(false);
    /*
    useEffect(() => {
        if(timeLeft === 0 && !shouldPause) return;
        setTimeout(() => setTimeLeft(x => x - 1), 1000);
    }, [timeLeft, shouldPause]);
    */
    const isLoggedIn = () => Boolean(userId); 
    const newNfts = () => {
        setLeftNft(null); setRightNft(null);
        return Promise.all([
            getRandomNFT().then((nft) => setLeftNft(nft)),
            getRandomNFT().then((nft) => setRightNft(nft))
        ]);
    }    
    
    const startCountDown = () => {
        const countDown = (timeLeft) => {
            if(timeLeft == 0 || shouldPause){
                return;
            }
            timeLeft--;
            setTimeLeft(timeLeft => timeLeft - 1);
            setTimeout(countDown, 1000, timeLeft);
        };
        setTimeout(countDown, 1000, timeLeft);
    }
    
    const initializeRound = () => {
        setShouldPause(true);
        setTimeLeft(10);
        newNfts().then(() => {
            setShouldPause(false);
            startCountDown();
        });
    }

    const start = () => {
        if(isLoggedIn()){
            createGame().then(() => {
                setRound(0);
                initializeRound();
            });
        }
        else{
            setRound(0);
            initializeRound();
        }
    }
    const nextRound = () => {
        initializeRound();
        setRound(round + 1);
        if(isLoggedIn()) 
            addToScore(1);
    }
    const end = () => {
        if(isLoggedIn()) 
            finishGame();
    }

    //all events that are happening
    const [isInGame, setIsInGame] = useState(false);
    const onStart = () => { start(); setIsInGame(true); }
    const onRestart = () => { if(isInGame) { end(); } start(); setIsInGame(true); }
    const onCorrect = () => { if(isInGame) nextRound(); }
    const onFailure = () => { end(); setShouldPause(true); setIsInGame(false); }
    useEffect(()=> { return () => { if(isInGame) {end();} setIsInGame(false); }}, []);;
    return (
        <Page>
            <div className="Game">
                <GameStage timeLeft ={timeLeft} score = {round} 
                    leftNft = {leftNft} rightNft = {rightNft}
                    onCorrect = {onCorrect} onFailure={onFailure}
                    onStart={onStart} onRestart={onRestart}/>
                <HowToPlay reactClassName="HowToPlay"/>
            </div>
        </Page>
    );
}

export default Game;