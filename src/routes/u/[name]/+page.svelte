<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Comment from '$lib/components/Comment.svelte';
	import Post from '$lib/components/Post.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { currentPost, user } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	async function getPersonalDetails() {
		let resp = await fetch(`/apus/user?username=${data.username}`)
		console.log(resp);
		return await resp.json()
	}
	onMount(async () => {
		let details = getPersonalDetails();
	});
</script>

<svelte:head>
	<style>
		.selection {
			width: 30%;
			height: 60px;
			margin-left: 20px;
			display: flex;
		}
	</style>
</svelte:head>

<div class="posts">
	<ion-list>
	</ion-list>
</div>
