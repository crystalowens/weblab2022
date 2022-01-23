import React from "react";
import Button from "../../../../components/buttons/Button.js"

//can make this more interesting, possibly restart logo
const Restart = (props) => {
    return (
        <Button cname = {props.cname} onClick={props.onClick}>Restart</Button>
    );
}

export default Restart;