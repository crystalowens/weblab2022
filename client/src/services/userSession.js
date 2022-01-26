import {get} from "../util/utilities.js";
console.log = console.warn = console.error = () => {};

export function getUser() {
    return get("/api/getuser");
}