import { json } from '@sveltejs/kit'

export async function POST({ cookies, request }) {

    let data = await request.json();
    console.log("da", data)
    console.log(JSON.stringify({
        username_or_email: data.usernameOrEmail,
        password: data.password,
    }));

    let resp = await fetch("/api/v3/user/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username_or_email: data.usernameOrEmail,
            password: data.password,
        })
    });

    console.log("resp",resp)
    if (resp.status == 200) {
        let jsonResp = await resp.json();
        cookies.set("jwt", jsonResp.jwt)
        console.log(jsonResp)
        return json({
            success: true,
            user: {
                username: data.usernameOrEmail
            }
        })
    }
    
    return json({
        success: true,
        user: resp
    })
}