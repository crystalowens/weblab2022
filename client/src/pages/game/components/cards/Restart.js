import React from "react";
import Button from "../../../../components/buttons/Button.js"

//can make this more interesting, possibly restart logo
const Restart = ({onClick}) => {
    return (
        <Button onClick={onClick}>Restart</Button>
    );
}

export default Restart;