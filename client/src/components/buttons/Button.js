import React from "react";
import Card from "../card/Card.js";
import "./Button.css";

const Button = (props) => {
    return (
        <div className = "Button" onClick={props.onClick}>
            <Card>{props.children}</Card>
        </div>
    );
}

export default Button;