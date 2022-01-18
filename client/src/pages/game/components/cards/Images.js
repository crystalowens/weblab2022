import React from "react";
import {useState, useEffect} from "react";
import ClickableImage from "../../../../components/clickable-image/ClickableImage";

import nft1 from "../../../../resources/images/bored-ape-1.jpg";
import {getUser} from "../../../../services/userSession.js";
import {getRandomNFT} from "../../../../services/nft.js";

import "../GameContent.css";
import "./Images.css";

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
            <p className="InfomaticTitle"><span className="InfomaticHeader">Title: </span>{clipText(name, 50)}</p>
            <p><span className="InfomaticHeader">Sold On: </span>{clipText(date, 50)}</p>
            <p className="InfomaticDescription">{clipText(description, 200)}</p>
        </div>
    );
}

const AnnotatedNFT = ({nft, onClick}) => {
    if(!nft) {
        onClick = () => {};
        nft = loadingNFT();
    }
    const size = { width: 500, height: 500 };
    return (
        <div className="AnnotatedNFT">
            <ClickableImage link = {nft.image} onClick={onClick} size={size}/>
            <NFTInfomatic name={nft.name} description={nft.description} date={formatDate(nft.date)}/>
        </div>
    );
}

const Images = ({leftNft, rightNft, onCorrect, onFailure}) => {
    const onLeftImageClick = () => { leftNft.price > rightNft.price ? onCorrect() : onFailure(); }
    const onRightImageClick = () => { leftNft.price < rightNft.price ? onCorrect() : onFailure(); }
    return (
        <div className="Images">
        <AnnotatedNFT nft = {leftNft} onClick={onLeftImageClick}/>
        <AnnotatedNFT nft = {rightNft} onClick={onRightImageClick}/>
        </div>
    );
};    

export default Images;