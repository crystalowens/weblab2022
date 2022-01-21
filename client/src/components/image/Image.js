import React from "react";
import "./Image.css";

const Image = ({link}) => {
    return (
        <img className="Image" src={link}/>
    );
}
export default Image;