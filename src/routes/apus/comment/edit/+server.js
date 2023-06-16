import { json } from '@sveltejs/kit'
import { client } from '$lib/lemmyclient.js'

export async function POST({ cookies, request }) {

    let body = await request.json();
    let jwt = cookies.get('jwt')

    console.log({
        comment_id: body.commentId,
        content: body.content,
        auth: jwt
    })
    let resp = await client.editComment({
        comment_id: body.commentId,
        content: body.content,
        auth: jwt
    })
    console.log("resp", resp)
    return json({
        success: false
    })
}
