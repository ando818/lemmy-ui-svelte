import { json } from '@sveltejs/kit'
export async function POST({ cookies, request }) {

    let data = await request.json();
    console.log("da", data)

    let resp = await fetch("https://retarded.dev/api/v3/user/register", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
            password_verify: data.passwordVerify,
            show_nsfw: false
        })
    });

    if (resp.status == 200) {
        let json = await resp.json();
        cookies.set("jwt", json.jwt)
    }
    
    return json({
        success: true,
        user: data
    })
}