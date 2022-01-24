import React from "react";
import Button from "../../../../components/buttons/Button.js"
import RestartArrow from "../../../../resources/images/restart_arrow.png";

//can make this more interesting, possibly restart logo
const Restart = (props) => {
    const style = {
        "margin": "0px",    
        "padding" : "0px"
    };
    return (
        <Button cname = {props.cname} onClick={props.onRestart}>
            <span style={style}>&#8635;</span>
        </Button>
    );
}

export default Restart;