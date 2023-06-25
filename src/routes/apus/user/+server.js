import { json } from '@sveltejs/kit'
import {getClient} from '$lib/lemmyclient.js'
export async function GET({ cookies, request, url }) {

    let username = url.searchParams.get("username");
    let client = getClient("https://lemmy.world");
    
    return json({
        personalDetails: await getPersonDetails(client, username)
    })
}

async function getPersonDetails(client, username) {
    let json = await client.getPersonDetails({
        username: username
    })
    return json;
}