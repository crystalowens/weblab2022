import {get} from "../util/utilities.js";

export function getRandomNFT() {
    return get("/api/randomNFT");
}