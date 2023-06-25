<script>
	export let posts = [];
	export let community;

	export let dontShowLoading = true;
	import Post from '$lib/components/Post.svelte';
	import { sortFilter, isLoading , lastPosts} from '$lib/store.js';
	import { onMount } from 'svelte';

    export let refresh;

    onMount(() => {
        console.log("refere",refresh)
        if (!refresh){
        $sortFilter = 'Hot';
        }
    })

	async function updateList() {
		if (!dontShowLoading) {
			$isLoading = true;
		}
		let resp = await fetch(`/apus/posts?community_name=${community}&sort_filter=${$sortFilter}`, {
			method: 'GET'
		});
		posts = (await resp.json()).posts;

        $lastPosts = posts;
		if (!dontShowLoading) {
			$isLoading = false;
		}
	}

	$: $sortFilter, updateList();
</script>

{#each posts as post}
	<Post bind:post />
{/each}
