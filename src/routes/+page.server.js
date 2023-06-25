
import { getClient } from "../lib/lemmyclient";
import { set } from 'svelte/store'
import { json } from "stream/consumers";

export const load = async ({ cookies }) => {

    let client = getClient("https://lemmy.world")

    return {
    }
};

async function getPosts() {
    let resp = await fetch("https://lemmy.world/api/v3/post/list?sort=Hot&type_=Local")
    let json = await resp.json()
    return json.posts;
}

async function getSite(client) {
    let json = await client.getSite({})
    return json;
}

async function getCommunities(client) {
    let json = await client.listCommunities({
        sort: "TopAll"
    })
    return json;
}
