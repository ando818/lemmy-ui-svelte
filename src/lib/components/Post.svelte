<script>
	export let post;
	import { goto } from '$app/navigation';

	import { Chatbox } from 'svelte-ionicons';
	import { currentPost } from '$lib/store.js';
	function parsePostType(post) {
		if (post.post.url?.includes('.jpg')) {
			return 'image';
		} else if (post.post.thumbnail_url) {
			return 'video';
		} else {
			return 'text';
		}
	}
	function getDisplayName(post) {
		if (post.creator.display_name) {
			return post.creator.display_name;
		} else {
			return post.creator.name;
		}
	}

	function goToPost(post) {
		console.log('yo');
		$currentPost = post;
		goto(`/post/${post.post.id}`, {});
	}

	function goTo(url) {
		goto(url, {});
	}
</script>

<ion-item>
	<div style="margin-right:10px;" />
	{#if parsePostType(post) == 'video'}
		<ion-img src={post.post.thumbnail_url} style="width:100px; height: 100px; padding-right:10px" />
	{:else if parsePostType(post) == 'image'}
		<a href={post.post.url}
			><ion-img src={post.post.url} style="width:100px; height: 100px; padding-right:10px" /></a
		>
	{:else}
		<div
			style="width: 100px; height: 100px; display:flex; align-items: center; padding-right: 10px; justify-content: center"
		>
			<Chatbox size="25" />
		</div>
	{/if}
	<ion-label>
		<div
			on:click={() => {
				if (post.post.url) {
					goTo(post.post.url);
				} else {
					goToPost(post);
				}
			}}
		>
			<h2>{post.post.name}</h2>
		</div>
		<h4><a>@{getDisplayName(post)}</a> to {post.community.title}</h4>
		<div on:click={() => 					goToPost(post)		}>
		<a><h3>{post.counts.comments} comments</h3></a>
		</div>
	</ion-label>
</ion-item>
