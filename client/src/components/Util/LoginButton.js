import React, { useContext } from "react"
import GoogleLogin, { GoogleLogout } from "react-google-login";
import {get, post} from "../../utilities.js"
import { UserIdContext } from "./UserIdContext.js";
import {socket} from "../../client-socket.js";
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "614951455943-9ndq92d918d5h755p5pm9fgm5epomn2g.apps.googleusercontent.com";

function createSignInHandlers(setUserId){

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);

    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return {handleLogin, handleLogout};
}
const LoginButton = () => {
  const {userId, setUserId} = useContext(UserIdContext);
  const {handleLogin, handleLogout} = createSignInHandlers(setUserId);
  return (
      <>
      {userId ? ( //IS Logged in
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : ( //NOT Logged in
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
  );
}

export default LoginButton; 

