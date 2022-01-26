import React, { useContext } from "react";
import { Router, Link } from "@reach/router";

import LoginButton from "../buttons/LoginButton.js";
import { UserIdContext } from "../../contexts/UserIdContext";
import useWindowSize from "../../pages/game/useWindowSize";

import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link to = {props.to} className = {`LinkText ${props.cname ? props.cname : ''}`}> {props.children}</Link>

const NavLinks = () => {
    
  const {userId} = useContext(UserIdContext);
  return (
      <div className="Links">
          <StyledLink to = "/">Play Game</StyledLink> <Divider/>
          <StyledLink to = "/about">About</StyledLink> <Divider/>
          {userId ? (<><StyledLink to="/profile">Profile</StyledLink> <Divider/></>) : (<></>)}
          <LoginButton cname = "LinkText"/>
      </div>
  );
}

const DropDown = () => {
    const {userId} = useContext(UserIdContext);
    return (
    <div className="DropDown">
        <div className="Bars">
            <div className="two"></div><div></div><div className="three"></div>
        </div>
        <div className="DropDown-content">
            <div className="LinkContainer">
            <div className="LinkEdge"><StyledLink cname="DropDownLink" to = "/">Play Game</StyledLink></div> 
            <div className="LinkEdge"><StyledLink cname="DropDownLink" to = "/about">About</StyledLink></div> 
            {userId ? (<div className="LinkEdge"><StyledLink cname="DropDownLink" to="/profile">Profile</StyledLink></div> ) : (<></>)}
            <div className="LinkEdge"><LoginButton cname = "DropDownLink"/></div> 
            
            </div>
        </div>
    </div>
    );
}

const NavBar = () => {
    const [width, height] = useWindowSize();
    return (
        <>
            <div className="NavBar-container">
                <h1 className="Title"><a href="/">NFT Showdown</a></h1>
                {width > 800 ? (<NavLinks path = "/"/>) : (<DropDown/>)}
            </div>
            <div className="Highlight-bar BarFill"></div>
        </>
    );
}

export default NavBar;
