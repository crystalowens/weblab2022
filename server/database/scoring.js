const User = require('../models/user.js');
const Game = require('../models/game.js');

function getUser(googleid) {
    return User.findOne({ googleid: googleid });
}

function getGame(googleid) {
    return Game.findOne({ googleid: googleid });
}

function addToScore(number, googleid){
    getGame(googleid).then((mongoGame)=>{
        mongoGame.score += 1;
        mongoGame.save();
    });
}

function startGame(googleid) {
    const game = new Game({
        score: 0,
        googleid:googleid
    });
    game.save();
}

function endGame(googleid) {
    getUser(googleid).then((mongoUser)=>{
        getGame(googleid).then((mongoGame)=>{
            if(mongoGame.score > mongoUser.highscore){
                mongoUser.highscore = mongoGame.score;
                mongoUser.save();
                Game.deleteMany({googleid:googleid});
            }
        });
    });
}

module.exports = {
    addToScore : addToScore,
    startGame : startGame,
    endGame : endGame
};