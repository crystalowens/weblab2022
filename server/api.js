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
const util = require('util');
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
  }).catch((error) => {
    console.log(`Unable to get NFT: ${util.inspect(error, {depth: null})}`);
  });
});

router.post("/startgame", (req, res) => {
  if (!req.user) { console.log("Cant start game without User."); return; }
  scoring.startGame(req.user._id).then((mongoGame) => {
    res.status(200).send({msg: "Started Game"});
  });
});

router.post("/endGame", (req, res) => {
  if (!req.user) { console.log("Cant end game without User."); return; }
  scoring.endGame(req.user._id).then(
    (mongoGame) => res.status(200).send({msg: "Ended Game"})
  );
});

router.post("/addscore", (req, res) => {
  if (!req.user) { console.log("Cant play game without User."); return; }
  scoring.addToScore(req.body.increase, req.user._id).then(
    (mongoGame) => res.status(200).send({msg: `Added ${req.body.increase} to score`})
  );
});

router.get("/getuser", (req, res) => {
  if (!req.user) { console.log("Cant find user."); return; }
  scoring.getUser(req.user._id).then(
    (mongoUser) => res.status(200).send(mongoUser)
  );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
