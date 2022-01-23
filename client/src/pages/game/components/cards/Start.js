import React from "react";
import Button from "../../../../components/buttons/Button.js"

const Start = (props) => {
    return (
        <Button cname = {props.cname} onClick={props.onClick}>Start</Button>
    );
}

export default Start;