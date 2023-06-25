export const load = async ({ cookies, params }) => {

    let resp = await fetch(`https://lemmy.world/api/v3/comment/list?post_id=${params.id}&limit=10000&sort=Hot`)
    let json = await resp.json()
    
    return {
        comments: json.comments
    };
};
