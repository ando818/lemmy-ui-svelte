import { json } from '@sveltejs/kit'
import { client } from '$lib/lemmyclient.js'

export async function POST({ cookies, request }) {

    let body = await request.json();
    let jwt = cookies.get('jwt')
    let resp = await client.likeComment({
        comment_id: body.commentId,
        score: body.score,
        auth: jwt
    })
    console.log("resp", resp)
    return json({
        success: false
    })
}
