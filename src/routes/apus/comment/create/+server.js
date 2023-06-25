import { json } from '@sveltejs/kit'
import { client } from '$lib/lemmyclient.js'

export async function POST({ cookies, request, url }) {

    let body = await request.json();

    console.log("cookies", cookies.get("jwt"))

    console.log("data", body)
    let instance = url.searchParams.get("instance");
    let resp = await fetch(`https://${instance}/api/v3/comment`, {
        headers: {
            'content-type': "application/json"
        },
        method:'POST',
        body: JSON.stringify({
            content: body.content,
            post_id: body.postId,
            parent_id: body.parentId,
            auth: cookies.get("jwt")
        })
    })
    console.log("resp", resp)
    let data = await resp.json();
    console.log("doako",data)
    return json({
        comment: data.comment_view,
        success: true
    })
}
