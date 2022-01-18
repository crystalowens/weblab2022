import React from "react";
import "./ClickableImage.css";

const ClickableImage = ({size, link, onClick}) => {
    return (
        <img className="ClickableImage" onClick={onClick} src={link}/>
    );
}
export default ClickableImage;