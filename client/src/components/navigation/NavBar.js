import React, { useContext } from "react";
import { Router, Link } from "@reach/router";

import LoginButton from "../buttons/LoginButton.js";
import { UserIdContext } from "../../contexts/UserIdContext";

import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link {...props} className = "LinkText"> {props.children}</Link>

const NavLinks = () => {
  const {userId} = useContext(UserIdContext);
  return (
      <div className="Links">
          <StyledLink to = "/">Play Game</StyledLink> <Divider/>
          <StyledLink to = "/about">About</StyledLink> <Divider/>
          {/* <StyledLink to = "/">Leaderboard</StyledLink> <Divider/> */}
          {userId && (
              <> 
                <StyledLink to={`/profile`} className="NavBar-link">
                Profile
                </StyledLink>
                <Divider/>
            </>
          )}

          <LoginButton/>
      </div>
  );
}

const NavBar = () => {
    return (
        <>
            <div className="NavBar-container">
                <h1 className="Title"><a href="/">NFT Showdown</a></h1>
                <NavLinks path = "/"/>
            </div>
            <div className="Highlight-bar BarFill"></div>
        </>
    );
}

export default NavBar;
