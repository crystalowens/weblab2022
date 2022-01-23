import React, { useState } from "react";

import "./StartTransition.css";

const StartTransition = (props) => {
    const [shouldRender, setShouldRender] = useState(true);
    const onStart = () => {
        props.onClick();
        setShouldRender(false);
    }
    if(shouldRender){
        return (
            <>
            <div className="InnerHelper"/>
            <div className="StartBlock">
                <span className="Text" onClick={onStart}>Click to Start</span>
            </div>
            </>
        );
    }
    else{
        return (<></>);
    }
}

export default StartTransition;