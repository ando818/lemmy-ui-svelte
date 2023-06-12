import { json } from '@sveltejs/kit'

export async function POST({ cookies, request }) {

    let data = await request.json();

    
    return json({
        success: true,
        user: data
    })
}