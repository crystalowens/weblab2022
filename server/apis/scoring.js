const User = require('../models/user.js');
const Game = require('../models/game.js');
const mongoose = require('mongoose');
const debug = require('../util/debug.js');

function getUser(userId) {
    console.log(`Retrieving User: ${userId}`);
    return User.findOne({ _id: userId });
}

function getGame(userId) {
    console.log(`Retrieving Game for: ${userId}`);
    return Game.findOne({ userId: (userId) });
}

function addToScore(number, userId){

    return getGame(userId).then((mongoGame)=>{
        try{
            debug.logObject(mongoGame);
            console.log(`Adding ${number} to Mongo Game:${mongoGame}`);
            mongoGame.score += number;
            return mongoGame.save();
        }
        catch (err) {
            console.log("User logged out during game");
        }
    }).catch((err)=>{});
}

function startGame(userId) {
    const game = new Game({
        score: Number(0),
        userId: userId
    });
    return game.save();
}

function endGame(userId) {
    return getUser(userId).then((mongoUser)=>{
        getGame(userId).then((mongoGame)=>{
            try {
                if(mongoGame.score > mongoUser.highscore){
                    mongoUser.highscore = mongoGame.score;
                    return Promise.all([mongoUser.save(), Game.deleteMany({userId : userId})]);
                }else{
                    return Game.deleteMany({userId : userId});
                }
            }
            catch (err) {
                console.log("User logged in during game");
            }
        }).catch((err)=>{});
    }).catch((err)=>{});
}

module.exports = {
    addToScore : addToScore,
    startGame : startGame,
    endGame : endGame,
    getUser : getUser
};