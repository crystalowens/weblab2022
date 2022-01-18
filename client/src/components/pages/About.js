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
            <h4 className="About-title">Imagine</h4>
            <div id="About-text">
                <div>
                <div>… a world defined by different currencies</div>
                <div>… a fully digital art environment</div>
                <div>… no “true” ownership</div>
                <div>How do we understand and explore this new world? Our site seeks to use the virtual medium to... </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default About;

