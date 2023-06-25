import { json } from '@sveltejs/kit'
import {get} from 'svelte/store'
export async function POST({ cookies, request }) {

    let data = await request.json();
    console.log("da", get('instance'))

    let resp = await fetch("https://createlab.io/api/v3/user/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            password_verify: data.passwordVerify,
            show_nsfw: true
        })
    });

    console.log(resp)

    if (resp.status == 200) {
        let respJson = await resp.json();
        console.log(json)
        cookies.set("jwt", respJson.jwt)
        return json({
            user: respJson
        })
    }
    
    return json({
        success: false,
        user: data
    })
}