import React from "react";
import {useState, useEffect} from "react";
import Image from "../../../components/image/Image";
import Clickable from "../../../components/clickable/Clickable";
import RoundTimer from "./cards/RoundTimer";
import FailedRoundHelper from "./cards/FailedRound";
import NoTimeHelper from "./cards/NoTime";

import "./Images.css";
import useTimer from "../useTimer";

const loadingNFT = () => {
    return {
        name: "Loading Nft...",
        description : "",
        image : "https://imgix.ranker.com/user_node_img/50012/1000224926/original/charcoal-photo-u1",
        price : 0,
        sold : Date.now()
    };
}

const clipText = (str, characters) => {
    if(!str) return "";
    if (str.length  > characters - 3) {
        return str.substring(0, characters - 3) + '...';
    }else{
        return str;
    }
}

const formatDate = (date) => {
    const options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString("en-US", options);
}

const NFTInfomatic = ({name, description, date}) => {
    return (
        <div className="Infomatic">
            <p className="InfomaticTitle"><span className="InfomaticHeader">Title: </span>{clipText(name, 75)}</p>
            <p><span className="InfomaticHeader">Sold On: </span>{clipText(date, 50)}</p>
        </div>
    );
}

const AdditionalInfo = ({price, description})=>{
    let priceText = "";
    if(price == 0){
        priceText = "Never Sold Before";
    }
    else{
        priceText = `Sold for ${price} ethereum.`;
    }
    return (
        <>
            <p className="Price">{priceText}</p>
            <p className="Description">Description : {clipText(description, 450)}</p>
        </>
    );
}

const CorrectScreen = (props) => {
    return (
        <div className="CorrectScreen AdditionalInfo">
            <AdditionalInfo price = {props.nft.price} description={props.nft.description}/>
        </div>
    );
}
const FailureScreen = (props) => {
    return (
        <div className="FailureScreen AdditionalInfo">
            <AdditionalInfo price = {props.nft.price} description={props.nft.description}/>
        </div>
    );
}

const AnnotatedNFT = ({nft, onClick, overlayState}) => {
    if(!nft) { nft = loadingNFT(); onClick = () => {};}
    const size = { width: 0, height: 0 };
    return (
        <div className="AnnotatedNFT">
        <div className="NftImage"><Clickable onClick = {onClick}><Image link = {nft.image}/></Clickable></div>
            {overlayState.activated ? (overlayState.wasCorrect ? CorrectScreen({nft}) : FailureScreen({nft})) : <></>}
            <NFTInfomatic name={nft.name} description={nft.description} date={formatDate(nft.sold)}/>
        </div>
    );
}

const NextRoundTimer = ({timeLeft}) => {
    return (
        <div className="CenterAlert NextRoundTimer">
            <RoundTimer restart = {true}/>
        </div>
    );
}
const FailedRound = () => {
    return (
        <div className="CenterAlert FailedRound">
            <FailedRoundHelper/>
        </div>
    );
}
const NoTime = () => {
    return (
        <div className="CenterAlert NoTime">
            <NoTimeHelper/>
        </div>
    );
}

const Images = ({leftNft, rightNft, onCorrect, onFailure, setPauseState, isInGame, timeIsZero}) => {
    const [madeDecision, setMadeDecision] = useState(false);
    const [leftWasCorrect, setLeftCorrectness] = useState(true);
    const [rightWasCorrect, setRightCorrectness] = useState(true);
    const [clickedCorrect, setClickedCorrect] = useState(false);
    const [timeLeft, resetTimer, setTimerActivated] = useTimer({onZero : () => { 
        setTimerActivated(false); resetTimer();
        if(clickedCorrect) setMadeDecision(false); 
        (clickedCorrect ? onCorrect() : onFailure());
    }, time : 3});

    useEffect(() => {
        if(isInGame) { //entering game
            setMadeDecision(false);
        }else{ //exiting game
            setTimerActivated(false); resetTimer();
        }
    }, [isInGame]);

    const endRound = () => {
        setMadeDecision(true); 
        setTimerActivated(true); setPauseState(true);
        if(leftNft.price == rightNft.price){
            setLeftCorrectness(true); setRightCorrectness(true);
        }else if(leftNft.price >= rightNft.price){
            setLeftCorrectness(true); setRightCorrectness(false);
        } else{
            setLeftCorrectness(false); setRightCorrectness(true);
        }
    }

    const onLeftImageClick = () => { 
        if(!isInGame) return;
        endRound();
        const correctness = leftNft.price >= rightNft.price;
        if(!correctness) onFailure();
        setClickedCorrect(correctness);
    }
    const onRightImageClick = () => {
        if(!isInGame) return;
        endRound();
        const correctness = leftNft.price <= rightNft.price;
        if(!correctness) onFailure();
        setClickedCorrect(correctness);
    }

    useEffect(() => {
        if(timeIsZero){
            endRound();
            setClickedCorrect(false);
        }
    }, [timeIsZero]);

    return (
        <div className="Images">
        <AnnotatedNFT nft = {leftNft} overlayState = {{activated : madeDecision, wasCorrect : leftWasCorrect}} onClick={onLeftImageClick}/>
        {(timeIsZero ? <NoTime/> : (madeDecision ? (clickedCorrect ? <NextRoundTimer timeLeft={timeLeft}/> : <FailedRound/>) : (<></>)))}
        <AnnotatedNFT nft = {rightNft} overlayState = {{activated : madeDecision, wasCorrect : rightWasCorrect}} onClick={onRightImageClick}/>
        </div>
    );
};    

export default Images;