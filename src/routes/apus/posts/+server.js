import { json } from '@sveltejs/kit'
import { getClient } from '$lib/lemmyclient';
export async function POST({ cookies, request }) {


    let communities = ['https://lemmy.world', 'https://lemmy.ml']

    let keys = Object.keys(communities);

    let posts = {

    }

    for (let j = 0; j < communities.length; j++) {
        let client = getClient(communities[j]);

        let resp = await client.getPosts({
            community_name: "gaming"
        });
        posts[communities[j]] = resp;
    }


    return json({
        posts
    })
}

export async function GET({ cookies, request, url }) {
    let client = getClient("https://lemmy.world");
    let resp = await client.listCommunities({})

    let communities = {
        gaming: ['https://lemmy.ml']
    }
    let community = url.searchParams.get("community_name")
    let sortFilter = url.searchParams.get("sort_filter")

    return json({
        posts: await getPosts(client, community,sortFilter),
    })
}

async function getPosts(client, community, sortFilter) {
    let json = await client.getPosts({
        community_name: community,
        sort: sortFilter
    })
    return json.posts
}

async function getSite(client) {
    let json = await client.getSite({})
    return json;
}
