import "./GameContent.css";
import nft1 from "../../../images/bored-ape-1.jpg";
import React from "react";
import {getUser} from "../../apicalls/gameScore.js";
import {useState, useEffect} from "react";

const GameImages = () => {
        const [gameImage1, setGameImage1] = useState({
            name : 	"Graffiti Bored Ape Yacht Club #019", 
            description: "Graffiti Bored Ape Yacht Club #019 is based off of the original Bored Ape Yacht Club 9618", 
            image: "https://lh3.googleusercontent.com/sToGIXU54pQg7WML0hepdqZSuHSlM4_bMiMGtDdneNdx-uspXveDu5pMY-iobBl7YGbXGMmSVRq5_ZiHeE8z3sYDUU1wZ7p5W--GlQ",
            price: 0.15, 
            sold: "2022-01-17T23:24:39.000Z",
        }); 
        const [gameImage2, setGameImage2] = useState({
            name : "doggos>nfts", 
            description: "DEF", 
            image: "https://images.dog.ceo/breeds/maltese/n02085936_1515.jpg",
            price: 1, 
            sold: "12/21",
        }); 

        const updateImages = () => {
            get('/api/randomNFT').then((gameImage)=> {
                setGameImage1(gameImage);
                console.log('set new game image 1');
            });
            get('/api/randomNFT').then((gameImage)=> {
                setGameImage2(gameImage);
                console.log('set new game image 2');
            });
            console.log('click received')
        };
      
        return (
          <>
          <div className = "NFTImages"
            onClick = {updateImages}>
              <div className="u-flex"
                      onClick = {updateImages}>        
              <div className="ImageContainer">
                      <img src={gameImage1.image}/>
                      <div id="ImageContainer-title">
                      Title: {gameImage1.name}
                      </div>
                      <div id="ImageContainer-description">
                      Title: {gameImage1.description}
                      <h1>Sold on {gameImage1.sold}</h1>
                      </div>
                  </div>
              </div>

              <div className="ImageContainer">
                      <img src={gameImage2.image}/>
                      <div id="ImageContainer-title">
                      Title: {gameImage2.name}
                      </div>
                      <div id="ImageContainer-description">
                      Title: {gameImage2.description}
                      <h1>Sold on {gameImage2.sold}</h1>
                      </div>
                  </div>
                  </div>
          </>
        );
      };    

 export default GameImages;