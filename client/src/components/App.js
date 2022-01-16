import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import HomePage from "./pages/HomePage.js";
import Game from "./pages/Game.js"
import Profile from "./pages/Profile.js"
import { UserIdContext } from "./Util/UserIdContext.js";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import "../utilities.css";

const App = () => {

  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
     get("/api/whoami").then((user) => {
       if (user._id) {
         // they are registed in the database, and currently logged in.
         setUserId(user._id);
       }
     });
  }, []);

  return (
    <>
    <UserIdContext.Provider value = {{userId, setUserId}}>
      <Router>
          <Game path = "/game/"/>
          <HomePage path = "/"/>
          <Profile path = "/profile/"></Profile>
          <NotFound default />
      </Router>
    </UserIdContext.Provider>
    </>
  );
};

export default App;
