import React from "react";
import { Router, Link } from "@reach/router";
import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link {...props} className = "LinkText"> {props.children}</Link>

const NavLinks = () => {
    return (
        <div className="Links">
            <StyledLink to = "/game/">Play Game</StyledLink> <Divider/>
            <StyledLink to = "/">About</StyledLink> <Divider/>
            <StyledLink to = "/">Leaderboard</StyledLink> <Divider/>
            <StyledLink to = "/profile/">Profile</StyledLink> 
        </div>
    );
}

const NavBar = () => {
    return (
        <div className="NavBar-container">
            <h1 className="Title"><a href="/">Art vs NFT</a></h1>
            <NavLinks path = "/"/>
        </div>
    );
}

export default NavBar;
