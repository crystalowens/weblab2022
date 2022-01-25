import React, { useEffect, useState } from "react";
import Card from "../../../../components/card/Card.js";
import useWindowSize from "../../useWindowSize.js";

import "./Score.css";

const Score = (props) => {
    const [width, height] = useWindowSize();
    /*Possible score animation
    const [shouldPop, setShouldPop] = useState(false);
    useEffect(() => {
        if(props.isInGame && props.score != 0){
            setShouldPop(true);
        }
    }, [props.isInGame, props.score]);
    let classStyling = '';
    if(shouldPop){
        classStyling = "ScoreNumber";
    }*/
    return (
        <Card cname = {props.cname}>{width > 1151 ? "Score: " : "" }
            <span className={""}>{props.score}</span>
        </Card>
    );
}

export default Score;