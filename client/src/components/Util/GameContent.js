import React from "react";
import "./GameContent.css";
import nft1 from "../../../images/bored-ape-1.jpg";
import nft2 from "../../../images/bored-ape-2.jpg";

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

const GameContent = () => {
    return (
        <div className="GameContent-container">
            <div className="ImagesSection">
                <div className="NFTImages">
                    <ImageContainer title = "NFT 1" description= "an nft" src={nft1}/>
                    <ImageContainer title = "NFT 2" description= "an nft" src={nft2}/>
                </div>
                <ImageContainer title = "Mona Lisa" description= "100 million dollar painting" 
                    src={nft2} size = {{width:'500px', height:'500px'}}/>
            </div>
        </div>
    );
}

export default GameContent;