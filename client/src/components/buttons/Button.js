import React from "react";
import Card from "../card/Card.js";

const Button = (props) => {
    return (
        <div onClick={props.onClick}>
            <Card>
                {props.children}
            </Card>
        </div>
    );
}

export default Button;