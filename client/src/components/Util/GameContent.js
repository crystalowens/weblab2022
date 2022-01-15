import React, { useState, useEffect } from "react";
import "./GameContent.css";
import nft1 from "../../../images/bored-ape-1.jpg";
import nft2 from "../../../images/bored-ape-2.jpg";
import { get } from "../../utilities"

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
    const [gameScore, setGameScore] = useState(0); 
    const incrementScore = () => {
        setGameScore(gameScore + 1); 
        console.log(gameScore);
    }
    const checkGuess = () => {
        // Figure out if they're right or not
        // update score
        // game over or generate new image set 
    }
    const [gameTimer, setGameTimer] = useState(10);
    useEffect(() => {
        console.log(gameScore);
        console.log(gameScore+1);
      }, []);
    
    return (
        <div className="GameContent-container">
            <div className="ImagesSection">
                <div className="NFTImages">
                    <div
                        onClick = {checkGuess} // You can probably set this up cleaner
                    >
                    <ImageContainer title = "NFT 1" description= "an nft" src={nft1}
                    /></div>
                    <div
                        onClick = {checkGuess}
                    >
                    <ImageContainer title = "NFT 2" description= "an nft" src={nft2}/>
                    </div>
                </div>
                <div>
                <div className = "GameTimer">Time remaining: {gameTimer} </div>
                <ImageContainer title = "Mona Lisa" description= "100 million dollar painting" 
                    src={nft2} size = {{width:'500px', height:'500px'}}/>
                </div>
            </div>
            <div className = "ScoreCard">
            <div>Score: {gameScore} </div>
            </div>
        </div>
    );
}

export default GameContent;