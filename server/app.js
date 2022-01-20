/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

//TA-created to make sure project is in order
const validator = require("./util/validator");
validator.checkSetup();

//Installed Libraries
const express = require("express");
const session = require("express-session"); // library that stores info about each connected user
const path = require("path");

//user defined libraries
const api = require("./apis/api");
const auth = require("./apis/auth");;


// create a new express server
const app = express();
app.use(validator.checkRoutes);
app.use(express.json()); // allow us to process POST requests
app.use(  // set up a session, which will persist login data across requests
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});
// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

module.exports = app;