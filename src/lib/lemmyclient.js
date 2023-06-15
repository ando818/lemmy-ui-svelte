import { Login, LemmyHttp } from "lemmy-js-client";

let headers = {
    "x-real-ip": "https://retarded.dev",
    "x-forwarded-for": "https://retarded.dev",
    "Access-Control-Allow-Origin": "*"
}
let baseUrl = 'https://retarded.dev';
export let client = new LemmyHttp(baseUrl, headers);

