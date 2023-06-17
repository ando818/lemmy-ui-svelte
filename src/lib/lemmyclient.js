import { Login, LemmyHttp } from "lemmy-js-client";
import { get } from 'svelte/store'
import { instance} from '$lib/store.js'

let baseUrl = 'https://lemmy.world';


export let client = new LemmyHttp(baseUrl, {});

let clients = {}

export function getClient(host) {
    if (!clients[host]) {
        clients[host] = new LemmyHttp(host, {});
    }

    return clients[host]
}