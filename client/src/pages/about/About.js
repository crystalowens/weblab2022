
import React from "react";
import NavBar from "../../components/navigation/NavBar.js";

import "./About.css";
import "../../util/utilities.js";

// X people have visited this page to learn more about NFTs! 

const About = () => {
  return (
    <>
    <div className="AboutPage">
        <NavBar/>
        <div className="u-flex">
            <div className="About-subContainer u-textCenter">
            <h4 className="About-title">About Me</h4>
            <div id="About-text">
                <div>
                This is why we made the site: 
                </div>
                <div className="About-hovercontrol">~~..~~</div>

            </div>
            
            </div>
        </div>
      </div>
    </>
  );
};

export default About;

