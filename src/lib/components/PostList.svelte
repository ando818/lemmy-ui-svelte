<script>
	export let posts = [];
	export let community;

	import Post from '$lib/components/Post.svelte';
	import { sortFilter, isLoading } from '$lib/store.js';

	async function updateList() {
        console.log('yo')
		$isLoading = true;
		let resp = await fetch(`/apus/posts?community_name=${community}&sort_filter=${$sortFilter}`, {
			method: 'GET'
		});
		posts = (await resp.json()).posts;
		$isLoading = false;
	}

	$: $sortFilter, updateList();
</script>

{#each posts as post}
	<Post bind:post />
{/each}
