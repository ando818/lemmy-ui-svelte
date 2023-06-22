
import { getClient } from "$lib/lemmyclient";
import { set } from 'svelte/store'

export const load = async ({ cookies, params }) => {
    let client =  getClient("https://lemmy.world");

    return {
        community: params.name
    };
};

async function getPosts(params) {
    let resp = await fetch(`https://lemmy.world/api/v3/post/list?sort=Hot&type_=All&community_name=${params.name}`)
    let json = await resp.json()
    return json.posts;
}

async function getSite(client) {
    let json = await client.getSite({})
    console.log(json)
    return json;
}

