import React from "react";
import GameContent from "../Util/GameContent";
import NavBar from "../Util/NavBar";
import "./Game.css";

const Game = () => {
    return (
        <div className="GamePage">
            <NavBar/>
            <GameContent/>
        </div>
    );
}

export default Game;