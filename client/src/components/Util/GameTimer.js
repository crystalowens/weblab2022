import React from "react";
import "./GameTimer.css";

/**
 * Component that renders timing
 *
 * Proptypes
 * @param {int} gameTimer is how long is left in the game
 */

const GameTimer = (props) => {

    return (
    <div>
        <div className = "GameTimer YellowBorder">Time remaining: {props.gameTimer} </div>
    </div>
  );
};

export default GameTimer;
