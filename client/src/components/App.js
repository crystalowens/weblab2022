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
//SERVICE IMPORTS
import {getUser} from "../services/userSession.js";
// import { socket } from "../client-socket.js";

import "../util/utilities.css";

const App = () => {

  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
     getUser().then((user) => {
       if (user._id) setUserId(user._id);
     });
  }, []);

  return (
    <>
    <UserIdContext.Provider value = {{userId, setUserId}}>
      <Router>
          <HomePage path = "/"/>
          <Game path = "/game/"/>
          <Profile path = "/profile/"/>
          <About path = "/about"/>
          <NotFound default />
      </Router>
    </UserIdContext.Provider>
    </>
  );
};

export default App;
