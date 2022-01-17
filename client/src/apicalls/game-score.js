import {get, post} from "../utilities.js";

export function startGame(){
    console.log('Game Started');
    return post("/api/startgame");
}

export function endGame(){
    return post("/api/endgame");
}

export function addToScore(value){
    return post("/api/addscore", {increase:value});
}
