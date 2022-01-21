import React from "react";
import Card from "../../../../components/card/Card.js";

const Rules = (props) => {
    return (
        <Card cname = {props.cname}>
            <h2>How To Play:</h2>
            <p>1. Press start. Two NFTs will appear on either side of your screen</p>
            <p>2. Click the NFT that is unobjectively more valuable based on recent sales prices</p>
            <p>3. Hone your skills, top the leaderboard, and tell your friends!</p>
        </Card>
    );
}

export default Rules;