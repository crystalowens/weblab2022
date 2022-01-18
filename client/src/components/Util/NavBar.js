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
          {/* <StyledLink to = "/about">About</StyledLink> <Divider/> */}
          {/* <StyledLink to = "/">Leaderboard</StyledLink> <Divider/> */}
          {userId && /*in the future add profiles to everyone/${userId}*/(
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
                <h1 className="Title"><a href="/">Art vs NFT</a></h1>
                <NavLinks path = "/"/>
            </div>
            <div className="Highlight-bar YellowFill"></div>
        </>
    );
}

export default NavBar;
