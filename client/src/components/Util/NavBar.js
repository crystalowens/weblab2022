import React from "react";
import { Router, Link } from "@reach/router";
import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link {...props} className = "LinkText"> {props.children}</Link>

const NavLinks = () => {
    return (
        <div className="Links">
            <StyledLink to = "/">Classic</StyledLink> <Divider/>
            <StyledLink to = "/">Hard Mode</StyledLink> <Divider/>
            <StyledLink to = "/">Art by Category</StyledLink> <Divider/>
            <StyledLink to = "/">Instructions</StyledLink> <Divider/>
            <StyledLink to = "/">About</StyledLink>
        </div>
    );
}

const NavBar = () => {
    return (
        <div className="NavBar-container">
            <h1 className="Title">Art vs NFT</h1>
            <NavLinks path = "/"/>
        </div>
    );
}

export default NavBar;
