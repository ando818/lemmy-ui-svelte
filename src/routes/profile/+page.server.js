
import { get } from "svelte/store";
import { user } from "$lib/store.js";

export const load = async ({ cookies }) => {

    console.log("faf",get(user))
    let jwt = cookies.get('user')
    console.log(jwt)
    let resp = await fetch(`https://retarded.dev/api/v3/user?username=${jwt}`)

    let json = await resp.json();
    console.log(json)
	return {
		/**
		 * The player's guessed words so far
		 */
		person: json
	};
};

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}