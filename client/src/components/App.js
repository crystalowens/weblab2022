import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
//PAGE IMPORTS
import HomePage from "../pages/home-page/HomePage.js";
import Game from "../pages/game/Game.js"
import Profile from "../pages/profile/Profile.js"
import About from "../pages/about/About.js"
import NotFound from "../pages/not-found/NotFound.js";
//CONTEXT IMPORTS
import { UserIdContext } from "../contexts/UserIdContext.js";
import { UserProfileContext } from "../contexts/UserProfileContext";
//SERVICE IMPORTS
import {getUser} from "../services/userSession.js";
// import { socket } from "../client-socket.js";

import "../util/utilities.css";

const App = () => {

  const [userId, setUserId] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);

  useEffect(() => {
     getUser().then((user) => {
       setUserProfile(user);
       console.log(`set profile to:${user}`);
       console.log(user);
       if (user._id) setUserId(user._id);
     });
  }, []);

  return (
    <>
    <UserProfileContext.Provider value = {{userProfile, setUserProfile}}>
      <UserIdContext.Provider value = {{userId, setUserId}}>
        <Router>
            <Game path = "/"/>
            <Profile path = "/profile/"/>
            <About path = "/about"/>
            <NotFound default />
        </Router>
      </UserIdContext.Provider>
    </UserProfileContext.Provider>
    </>
  );
};

export default App;
