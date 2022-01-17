const User = require('../models/user.js');
const Game = require('../models/game.js');
const mongoose = require('mongoose');

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
        console.log(`Mongo Game:${mongoGame}`);
        console.log(`Adding Number: ${number}`);
        const score = mongoGame.score;
        mongoGame.score = score + number;
        return mongoGame.save();
    });
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
            if(mongoGame.score > mongoUser.highscore){
                mongoUser.highscore = mongoGame.score;
                return Promise.all([mongoUser.save(), Game.deleteMany({userId : userId})]);
            }
        });
    });
}

module.exports = {
    addToScore : addToScore,
    startGame : startGame,
    endGame : endGame
};