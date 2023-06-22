<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Comment from '$lib/components/Comment.svelte';
	import Post from '$lib/components/Post.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { currentPost, user } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	console.log(data);
	let posts = [];
	onMount(async () => {});
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
		<ion-list-header>Posts</ion-list-header>
		<PostList bind:posts={data.posts} bind:community={data.community}/>
	</ion-list>
</div>
