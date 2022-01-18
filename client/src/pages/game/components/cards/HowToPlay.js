import React from "react";
import "./HowToPlay.css";

const Rules = (props) => {
    return (
        <div className={`HowToPlayContainer YellowBorder ${props.className ? props.className : ''}`}>
            <h2>How To Play:</h2>
            <p>1. Two random NFTs will appear on either side of your screen</p>
            <p>2. Click the NFT which is unobjectively more expensive</p>
            <p>3. Reach the leaderboards and tell your friends!</p>
        </div>
    );
}

export default Rules;