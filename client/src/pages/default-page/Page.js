import React from "react";
import NavBar from "../../components/navigation/NavBar.js"

import "./Page.css";

const Page = (props) => {
    return (
        <div className="Page">
            <div className="NavBar">
                <NavBar/>
            </div>
            <div className="PageBody">
                {props.children}
            </div>
        </div>
    );
}

export default Page;