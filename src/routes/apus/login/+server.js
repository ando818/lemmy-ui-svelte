import { json } from '@sveltejs/kit'

export async function POST({ cookies, request }) {

    let data = await request.json();
    console.log("da", data)
    console.log(JSON.stringify({
        username_or_email: data.usernameOrEmail,
        password: data.password,
    }));

    let resp = await fetch("https://lemmy.world/api/v3/user/login", {
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
        cookies.set("jwt", jsonResp.jwt, { path: '/'})
        cookies.set("user", data.usernameOrEmail, { path: '/'})
        console.log("cookie", cookies.get("jwt"))
        console.log(jsonResp)
        console.log(parseJwt(jsonResp.jwt))
        return json({
            success: true,
            user: {
                jwt: jsonResp.jwt,
                person_id: parseJwt(jsonResp.jwt).sub,
                username: data.usernameOrEmail
            }
        })
    }

    return json({
        success: false,
        user: resp
    })
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}