<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Post from '$lib/components/Post.svelte';
	import { currentPost } from '$lib/store';

	export let data;

	function goToPost(post) {
		$currentPost = post;
		goto(`/post/${post.post.id}`, {});
	}
</script>

<svelte:head>
	<title>Lemmy</title>
</svelte:head>

<div class='main'>
	<div class='posts'>
		<ion-list>
			<ion-list-header>Posts</ion-list-header>

			{#each data.posts as post}
				<Post bind:post />
			{/each}
		</ion-list>

	</div>
	<div class='side'>
	</div>
</div>

<style>
	.main {
		position: relative;
	}
	.posts {
		position: relative;
		width: 90%;
	}
	.side {
		position: absolute;
		top:0;
		right:0;
		height: 100vh;
		width:10%
	}
</style>