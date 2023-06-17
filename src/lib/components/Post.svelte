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
</script>

<div class="item">
	<div class='votes'>
		<div>
		<ArrowUpOutline size="20" class="icon" on:click={() => likeComment(tree.comment)} />
		</div>
		<div style='text-align:center'> {post.counts.score}</div>
		<div>
			<ArrowDownOutline size="20" class="icon" />
		</div>
	</div>
	<div class={'image-container' + (main ? ' main' : '')}>
		{#if parsePostType(post) == 'video'}
			<ion-img
				src={post.post.thumbnail_url}
				style="width:100%;  height: 10vh; object-fit: cover; border-radius: 4px"
			/>
		{:else if parsePostType(post) == 'image'}
			<a href={post.post.url}
				><ion-img
					src={post.post.url}
					style="width:100%; height: 10vh; object-fit: cover; border-radius: 4px"
				/></a
			>
		{:else}
			<div
			class='mobile-chat'
				style="width: 100%; height: 6vh; display:flex; align-items: center; justify-content: center; background: #353232; border-radius: 4px"
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

.post {
	margin-left:10px;
}

.votes {
	color: gray;
	margin-top:10px;
	margin-right: 20px;
	margin-left: 10px;
}
	.post h2{
		font-size:18px;
	}
	.post h3 {
		font-size:12px;

	}
	.post h4{
		font-size:12px;

	}
	.item {
		height: fit-content;
		display: flex;
		margin-bottom:10px;
	}
	.item img {
		width: 200px;
		height:200px;
	}

	.image-container {
		width: 8vw;
		height: 10vh;

	}

	.post-title {
		word-wrap: break-word;
		white-space: normal;
	}
	@media (max-width: 767px) {
		.image-container {
			width: 10vw;
			height: fit-content;
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
		.main {
			margin-top: 4px;
			width: 30vw;
		}
	}
</style>
