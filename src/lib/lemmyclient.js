import { Login, LemmyHttp } from "lemmy-js-client";

let headers = {
    "x-real-ip": "https://https://lemmy.world",
    "x-forwarded-for": "https://https://lemmy.world",
}
let baseUrl = 'https://lemmy.world';
export let client = new LemmyHttp(baseUrl, headers);

