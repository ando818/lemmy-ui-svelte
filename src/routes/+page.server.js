export const load = async ({ cookies }) => {

    let resp = await fetch("https://lemmy.world/api/v3/community/list")
    let json = await resp.json()
    console.log(json)
    

	return {
		/**
		 * The player's guessed words so far
		 */
		communities: json.communities,
        posts: await getPosts()
	};
};

async function getPosts() {
    let resp = await fetch("https://lemmy.world/api/v3/post/list?sort=Hot&type_=Local")
    let json = await resp.json()
    return json.posts;
}