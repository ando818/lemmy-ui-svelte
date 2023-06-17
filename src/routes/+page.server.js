
import { getClient } from "../lib/lemmyclient";
import { set } from 'svelte/store'

export const load = async ({ cookies }) => {
    let client =  getClient("https://lemmy.world");
    let json = await client.listCommunities({})

    return {
        communities: json.communities,
        posts: await getPosts(),
        site: await getSite(client)
    };
};

async function getPosts() {
    let resp = await fetch("https://lemmy.world/api/v3/post/list?sort=Hot&type_=Local")
    let json = await resp.json()
    return json.posts;
}
async function getSite(client) {
    let json = await client.getSite({})
    console.log(json)
    return json;
}

