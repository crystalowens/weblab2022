import {get} from "../util/utilities.js";

export function getUser() {
    return get("/api/whoami");
}