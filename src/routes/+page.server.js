
import { getClient } from "../lib/lemmyclient";
import { set } from 'svelte/store'

export const load = async ({ cookies }) => {
    let json = await getClient("https://lemmy.world").listCommunities({})

    return {
        communities: json.communities,
        posts: await getPosts()
    };
};

async function getPosts() {
    let resp = await fetch("https://lemmy.world/api/v3/post/list?sort=Hot&type_=Local")
    let json = await resp.json()
    return json.posts;
}