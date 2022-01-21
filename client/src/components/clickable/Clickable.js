import React from "react";
import "./Clickable.css";

const Clickable = (props) => {
    return (
        <div className="Clickable" onClick={props.onClick}>
            {props.children}
        </div>
    );
}
export default Clickable;