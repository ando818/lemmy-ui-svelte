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
	<title>Ionic Companion - Lists</title>
</svelte:head>

	<ion-content fullscreen>
		<ion-list>
			<ion-list-header>Posts</ion-list-header>

			{#each data.posts as post}
				<div on:click={() => goToPost(post)}>
					<Post bind:post />
				</div>
			{/each}
		</ion-list>
	</ion-content>

Ionic Companion - Lists
