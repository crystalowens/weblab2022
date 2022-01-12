import React from "react";
import { Router, Link } from "@reach/router";
import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>

const NavLinks = () => {
    return (
        <div className="Links">
            <Link to = "/">Classic</Link> <Divider/>
            <Link to = "/">Hard Mode</Link> <Divider/>
            <Link to = "/">Art by Category</Link> <Divider/>
            <Link to = "/">Instructions</Link> <Divider/>
            <Link to = "/">About</Link>
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
