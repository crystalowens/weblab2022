import React, { useEffect, useState } from "react";
import Page from "../default-page/Page.js";

import { getRandomNFT } from "../../services/nft.js";
import { addToScore, endGame, startGame } from "../../services/gameSession.js";

import HowToPlay from "./components/cards/HowToPlay.js";
import Images from "./components/cards/Images.js";
import Timer from "../../components/timer/Timer.js"; 
import Score from "../../components/score/Score.js"; 

import "./Game.css";

const GameInfo = ({timeLeft, score}) => {
    return (
        <div className = "GameInfo">
            <Timer reactClassName="Timer" timeLeft={timeLeft}/>
            <Score score={score}/>
        </div>
    );
}

const GameStage = (props) => {
    return (
        <div className="GameStage">
            <GameInfo timeLeft={props.timeLeft} score={props.score}/>
            <Images leftNft={props.leftNft} rightNft={props.rightNft} 
                onCorrect={props.onCorrect} onFailure={props.onFailure}/>
        </div>
    );
}

const Game = () => {

    const [leftNft, setLeftNft] = useState(null);
    const [rightNft, setRightNft] = useState(null);
    const [round, setRound] = useState(0);

    const newNfts = () => {
        getRandomNFT().then((nft) => {setLeftNft(nft); console.log(nft)});
        getRandomNFT().then((nft) => setRightNft(nft));
    }

    useEffect(()=> {
        startGame();
        newNfts();
    }, []);

    const nextRound = () => {
        addToScore(1);
        setRound(round + 1);
        newNfts();
    }
    const onCorrect = () => {
        nextRound();
    }
    const onFailure = () => {
        endGame();
    }
    return (
        <Page>
            <div className="Game">
                <GameStage timeLeft ={10} score = {round} 
                    leftNft = {leftNft} rightNft = {rightNft}
                    onCorrect = {onCorrect} onFailure={onFailure}/>
                <HowToPlay reactClassName="HowToPlay"/>
            </div>
        </Page>
    );
}

export default Game;