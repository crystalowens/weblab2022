import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { UserIdContext } from "./UserIdContext";
import LoginButton from "./LoginButton";
import "./NavBar.css";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link {...props} className = "LinkText"> {props.children}</Link>

const NavLinks = () => {
  const {userId} = useContext(UserIdContext);
  return (
      <div className="Links">
          <StyledLink to = "/game/">Play Game</StyledLink> <Divider/>
          {/* <StyledLink to = "/">About</StyledLink> <Divider/> */}
          {/* <StyledLink to = "/">Leaderboard</StyledLink> <Divider/> */}
          {/* <StyledLink to = "/profile/">Profile</StyledLink> <Divider/> */}

          {userId && (
            <StyledLink to={`/profile/${userId}`} className="NavBar-link">
            Profile
            </StyledLink>
          )}

          <LoginButton/>
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
