<script>
	export let post;
	import { goto } from '$app/navigation';

	import { Chatbox } from 'svelte-ionicons';
	import { currentPost } from '$lib/store.js';
	function parsePostType(post) {
		if (post.post.url?.includes('.jpg') || post.post.url?.includes('.png')) {
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

<ion-item class="item">
	<div class='image-container'>
	{#if parsePostType(post) == 'video'}
		<ion-img src={post.post.thumbnail_url} style="width:100%;  object-fit: cover; padding-right:10px" />
	{:else if parsePostType(post) == 'image'}
		<a href={post.post.url}
			><ion-img src={post.post.url} style="width:100%; object-fit: cover; padding-right:10px" /></a
		>
	{:else}
		<div
			style="width: 100%; height: 10vh; display:flex; align-items: center; padding-right: 10px; justify-content: center"
		>
			<Chatbox size="25" />
		</div>
	{/if}
	</div>
	<ion-label>
		<div class="post mobile">
			<div
				on:click={() => {
					if (post.post.url) {
						goTo(post.post.url);
					} else {
						goToPost(post);
					}
				}}
			>
				<h2 class="post-title">{post.post.name}</h2>
			</div>
			<h4><a>@{getDisplayName(post)}</a> to {post.community.title}</h4>
			<div on:click={() => goToPost(post)}>
				<a><h3>{post.counts.comments} comments</h3></a>
			</div>
		</div>
	</ion-label>
</ion-item>

<style>
	.item {
		height: fit-content;
	}

	.image-container {
		width:100px;
	
	}

	.post-title {
		word-wrap: break-word;
		white-space: normal;
	}
	@media (max-width: 767px) {
		.image-container {
			width:20vw;
		}
		.mobile h2 {
			font-size: 14px;
		}
		.mobile h3 {
			font-size: 10px;
		}
		.mobile h4 {
			font-size: 10px;
		}
	}
</style>
