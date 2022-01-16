/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
// import authentication library
const auth = require("./auth");
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const nft = require('./nft');
const scoring = require('./database/scoring.js');

router.post("/login", auth.login);
router.post("/logout", auth.logout);


router.get("/whoami", (req, res) => {
  if (!req.user) {
    return res.send({});// not logged in
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/randomNFT", (req, res) => {
  nft.randomNFT().then((randomNFT) =>{
    res.send(randomNFT);;
  });
});

router.post("/startgame", (req, res) => {
  scoring.startGame(req.body.googleid);
});

router.post("/endGame", (req, res) => {
  scoring.endGame(req.body.googleid);
});

router.post("/addscore", (req, res) => {
  scoring.addToScore(req.body.increase, req.body.googleid);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
