export const load = async ({ cookies, params }) => {

    let resp = await fetch(`https://retarded.dev/api/v3/comment/list?post_id=${params.id}`)
    let json = await resp.json()
    
    return {
        comments: json.comments
    };
};
