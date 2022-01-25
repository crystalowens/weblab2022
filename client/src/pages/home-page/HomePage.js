import React from "react";

import "./HomePage.css"
import img1 from "../../resources/images/bored-ape-1.jpg";
import img2 from "../../resources/images/bored-ape-2.jpg";
import img3 from "../../resources/images/bored-ape-3.jpg";
import img4 from "../../resources/images/bored-ape-4.jpg";
import img5 from "../../resources/images/bored-ape-5.jpg";
import img6 from "../../resources/images/bored-ape-6.jpg";

const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="HomePage-window">
                <div className="HomePage-background">
                <div className="HomePage-Row">
                        <img src = {img1}/>
                        <img src = {img2}/>
                        <img src = {img3}/>
                    </div>
                    <div className="HomePage-Row">
                        <img src = {img4}/>
                        <img src = {img5}/>
                        <img src = {img6}/>
                    </div>
                </div>
                
                <div className="TitleZone Transparent-Background" >
                    <a href="\game\">NFT Apprai$al Trainer</a>
                    <button className="StartButton Transparent-Background BlinkBorder">
                        <a href="\game\">Play Game</a>
                    </button>
                </div>
                {/* <div className="OtherLinks Transparent-Background"> 
                    <a href="/"> Login </a>
                     |&nbsp;
                    <a href="/"> Leaderboard </a> |&nbsp;
                    <a href="/"> About </a>
                 </div> */}

            </div>
        </div>
    );
}

export default HomePage;