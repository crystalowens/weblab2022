import { get } from "../../utilities"
import "../../utilities.css";
import "./About.css";
import React from "react";
import NavBar from "../Util/NavBar";
import {useState, useEffect} from "react";

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

