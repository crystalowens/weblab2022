import React from "react";
import "./Card.css";

const Card = (props) => {
    console.log(`Card Classes: Card YellowBorder ${props.reactClassName || ""}`);
    return (
        <div className={`Card YellowBorder ${props.reactClassName || ""}`}>
            {props.children}
        </div>
    );
}

export default Card;