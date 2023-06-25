import { json } from '@sveltejs/kit'
import {get} from 'svelte/store'
import { instance} from '$lib/store.js'
export async function GET({ cookies, request,url }) {

    let instance = url.searchParams.get("instance")
    console.log(instance, url.searchParams, `https://${instance}/api/v3/site`)
    let resp = await fetch(`https://${instance}/api/v3/site`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    });

    if (resp.status == 200) {
        let respJson = await resp.json();
        return json(respJson)
    }
    
    return json({
        success: false,
        user: data
    })
}