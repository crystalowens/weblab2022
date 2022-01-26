import {post} from "../util/utilities.js";

export function createGame(){
    console.log('Created game with api');
    return post("/api/startgame");
}

export function finishGame(){
    console.log('Ended game with api');
    return post("/api/endgame");
}

export function addToScore(value){
    console.log('Added game with api');
    return post("/api/addscore", {increase:value});
}
