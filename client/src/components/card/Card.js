import React from "react";
import "./Card.css";

const Card = (props) => {
    return (
        <div className={`Card YellowBorder ${props.reactClassName || ""}`}>
            {props.children}
        </div>
    );
}

export default Card;