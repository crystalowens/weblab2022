import React from "react";
import Card from "../../../../components/card/Card.js";
import useWindowSize from "../../useWindowSize.js";

const Score = ({score}) => {
    const [width, height] = useWindowSize();
    return (
        <Card>{width > 1120 ? "Score: " : "" }{score}</Card>
    );
}

export default Score;