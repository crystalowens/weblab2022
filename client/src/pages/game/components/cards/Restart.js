import React from "react";
import Button from "../../../../components/buttons/Button.js"

//can make this more interesting, possibly restart logo
const Restart = (props) => {
    console.log(props.onRestart);
    return (
        <Button cname = {props.cname} onClick={props.onRestart}>Restart</Button>
    );
}

export default Restart;