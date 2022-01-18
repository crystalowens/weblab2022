import {post} from "../util/utilities.js";

export function createGame(){
    console.log('Game Started');
    return post("/api/startgame");
}

export function finishGame(){
    return post("/api/endgame");
}

export function addToScore(value){
    return post("/api/addscore", {increase:value});
}
