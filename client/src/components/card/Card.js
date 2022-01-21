import React from "react";
import "./Card.css";

const Card = (props) => {
    return (
        <div className={`Card GreyFill ${props.cname || ""}`}>
            {props.children}
        </div>
    );
}

export default Card;