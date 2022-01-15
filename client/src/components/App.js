import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import HomePage from "./pages/HomePage.js";
import Game from "./pages/Game.js"
import Profile from "./pages/Profile.js"


import { get, post } from "../utilities";

import "../utilities.css";


/**
 * Define the "App" component
 */
const App = () => {
/*
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

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
  */
  //<Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
  return (
    <>
      <Router>
        <Game path = "/game/"/>
        <HomePage path = "/"/>
        <Profile path = "/profile/"></Profile>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
