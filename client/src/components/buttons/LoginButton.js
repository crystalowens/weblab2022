import React, { useContext } from "react"
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {get, post} from "../../util/utilities.js"
import { UserIdContext } from "../../contexts/UserIdContext.js";
//import {socket} from "../../client-socket.js";THIS IS WHERE SOCKET ERRORS ARE FROM
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "614951455943-9ndq92d918d5h755p5pm9fgm5epomn2g.apps.googleusercontent.com";

function createSignInHandlers(setUserId){

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);

    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      //post("/api/initsocket", { socketid: socket.id }); needs import socket
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return {handleLogin, handleLogout};
}

const createCustomButtons = (cname) => {
  const CustomLoginButton = (renderProps) => {
    return (
      <span className = {cname} style = {{"cursor":"pointer"}} onClick={renderProps.onClick}>Login</span>
    );
  }

  const CustomLogoutButton = (renderProps) => {
    return (
      <span className = {cname} style = {{"cursor":"pointer"}}  onClick={renderProps.onClick}>Logout</span>
    );
  }
  return [CustomLoginButton, CustomLogoutButton];
}

const LoginButton = ({cname}) => {
  const [customLoginButton, customLogoutButton] = createCustomButtons(cname);
  const {userId, setUserId} = useContext(UserIdContext);
  const {handleLogin, handleLogout} = createSignInHandlers(setUserId);
  return (
      <>
      {userId ? ( //IS Logged in
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            render = {customLogoutButton}
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : ( //NOT Logged in
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            render={customLoginButton}
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
  );
}

export default LoginButton; 

