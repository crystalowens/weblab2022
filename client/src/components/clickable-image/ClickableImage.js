import React from "react";
import "./ClickableImage.css";

const ClickableImage = ({size, link, onClick}) => {
    const style = {
        width : `${size.width}px`,
        height : `${size.height}px`
    };
    return (
        <img className="ClickableImage" style={style} onClick={onClick} src={link}/>
    );
}
export default ClickableImage;