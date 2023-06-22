<script>
	export let post;
	import { goto } from '$app/navigation';
	import { Chatbox } from 'svelte-ionicons';
	import { currentPost } from '$lib/store.js';
	import {
		AddCircleOutline,
		RemoveCircleOutline,
		LinkOutline,
		ArrowUpOutline,
		ArrowDownOutline,
		StarOutline,
		CreateOutline
	} from 'svelte-ionicons';
	export let main = true;

	function parsePostType(post) {
		if (post.post.url?.includes('.jpg') || post.post.url?.includes('.png')) {
			return 'image';
		} else if (post.post.thumbnail_url) {
			return 'video';
		} else {
			return 'text';
		}
	}

	function parsePostImg(post) {
		if (post.post.url?.includes('.jpg') || post.post.url?.includes('.png')) {
			return post.post.url;
		} else if (post.post.thumbnail_url) {
			return post.post.thumbnail_url;
		} else {
			return '';
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
		$currentPost = post;
		goto(`/post/${post.post.id}`, {});
	}

	function goTo(url) {
		goto(url, {});
	}

	let backdropVisible = false;
	let clickedPost = null;

	function enableImage(post) {
		backdropVisible = true;
		clickedPost = post;
	}
</script>

<ion-backdrop
	tappable
	class={backdropVisible ? '' : 'hidden'}
	on:ionBackdropTap={() => (backdropVisible = false)}
/>
{#if backdropVisible}
	<div id="box" class={backdropVisible ? '' : 'hidden'}>
		<ion-img style='position: fixed; object-fit: cover; width: 90vw; height: 50vh;' src={parsePostImg(clickedPost)} />
	</div>
{/if}

<div class="item">
	<div class="votes">
		<div>
			<ArrowUpOutline size="16" class="icon" on:click={() => likeComment(tree.comment)} />
		</div>
		<div style="text-align:center; font-size: 12px">{post.counts.score}</div>
		<div>
			<ArrowDownOutline size="16" class="icon" />
		</div>
	</div>
	<div class={'image-container' + (main ? ' main' : '')}>
		{#if parsePostType(post) == 'video'}
			<ion-img
				src={post.post.thumbnail_url}
				class="image-thumbnail"
				on:click={() => enableImage(post)}
			/>
		{:else if parsePostType(post) == 'image'}
			<ion-img src={post.post.url} class="image-thumbnail" on:click={() => enableImage(post)} />
		{:else}
			<div
				class="mobile-chat"
				style="width: 15vw; height: 6vh; display:flex; align-items: center; justify-content: center; background: #353232; border-radius: 4px"
			>
				<Chatbox size="25" />
			</div>
		{/if}
	</div>
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
</div>

<style>
	ion-backdrop {
		opacity: 0.2;
		background: var(--ion-color-primary);
	}

	.hidden {
		display: none;
	}

	#box {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--ion-background-color, #fff);
		width: 90%;
		height: 200px;
		border-radius: 10px;
	}
	.post {
		margin-left: 10px;
		margin-top: auto;
		margin-bottom: auto;
	}

	.votes {
		color: gray;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		margin-left: 10px;
	}
	.post h2 {
		font-size: 18px;
	}
	.post h3 {
		font-size: 12px;
	}
	.post h4 {
		font-size: 12px;
	}
	.item {
		width: 97%;
		height: fit-content;
		display: flex;
		margin-bottom: 10px;
	}
	.item img {
		width: 200px;
		height: 200px;
	}

	.image-container {
		width: 15vw;
		height: 8vh;
	}

	.post-title {
		word-wrap: break-word;
		white-space: normal;
	}

	.image-thumbnail {
		width: 15vw;
		height: 7vh;
		object-fit: fill;
		border-radius: 4px;
		margin-top: auto;
		margin-bottom: auto;
	}
	@media (max-width: 767px) {
		.image-container {
			width: 15vw;
			height: fit-content;
		}
		.mobile h2 {
			font-size: 12px;
		}
		.mobile h3 {
			font-size: 10px;
		}
		.mobile h4 {
			font-size: 10px;
		}
		.main {
			margin-top: 4px;
			width: 15vw;
		}
	}
</style>
