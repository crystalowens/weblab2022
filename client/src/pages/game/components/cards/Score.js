import React from "react";
import Card from "../../../../components/card/Card.js";
import useWindowSize from "../../useWindowSize.js";

const Score = (props) => {
    const [width, height] = useWindowSize();
    return (
        <Card cname = {props.cname}>{width > 1120 ? "Score: " : "" }{props.score}</Card>
    );
}

export default Score;