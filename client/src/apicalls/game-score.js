import {get, post} from "../utilities.js";

export function startGame(googleid){
    console.log('Game Started');
    return post("/api/startgame", {googleid:googleid});
}

export function endGame(googleid){
    return post("/api/endgame", {googleid:googleid});
}

export function addToScore(googleid, value){
    return post("/api/addscore", {increase:value, googleid:googleid});
}
