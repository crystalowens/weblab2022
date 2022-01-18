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
        title: "Loading Nft...",
        description : "",
        image : "https://imgix.ranker.com/user_node_img/50012/1000224926/original/charcoal-photo-u1",
        price : 0,
        sold : Date.now()
    };
}

const NFTInfomatic = ({title, description, date}) => {
    return (
        <div className="Infomatic">
            <p className="InfomaticTitle"><span className="InfomaticHeader">Title: </span>{title}</p>
            <p><span className="InfomaticHeader">Sold On: </span>{date}</p>
            <p className="InfomaticDescription">{description}</p>
        </div>
    );
}

const AnnotatedNFT = ({nft, onClick}) => {
    if(!nft) {
        onClick = () => {};
        nft = loadingNFT();
    }
    const formattedDate = Date(nft.sold).toString();
    const size = { width: 400, height: 400 };
    return (
        <div className="AnnotatedNFT">
            <ClickableImage link = {nft.image} onClick={onClick} size={size}/>
            <NFTInfomatic title={nft.title} description={nft.description} date={formattedDate}/>
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