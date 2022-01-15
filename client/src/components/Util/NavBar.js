import React from "react";
import { Router, Link } from "@reach/router";
import "./NavBar.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Divider = () => <>&nbsp;|&nbsp;</>
const StyledLink = (props) => <Link {...props} className = "LinkText"> {props.children}</Link>

const NavLinks = (props) => {
    return (
        <div className="Links">
            <StyledLink to = "/game/">Play Game</StyledLink> <Divider/>
            <StyledLink to = "/">About</StyledLink> <Divider/>
            <StyledLink to = "/">Leaderboard</StyledLink> <Divider/>
            <StyledLink to = "/profile/">Profile</StyledLink> <Divider/>
            {props.userId && (
            <StyledLink to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
            </StyledLink>
            )}
            {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
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
