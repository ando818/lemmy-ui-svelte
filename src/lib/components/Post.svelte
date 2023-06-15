<script>
	export let post;
	import { Chatbox } from 'svelte-ionicons';

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
</script>

<ion-item>
	<div style="margin-right:10px;" />
	{#if parsePostType(post) == 'video'}
		<ion-img src={post.post.thumbnail_url} style="width:100px; height: 100px; padding-right:10px" />
	{:else if parsePostType(post) == 'image'}
		<ion-img src={post.post.url} style="width:100px; height: 100px; padding-right:10px" />
	{:else}
		<div
			style="width: 100px; height: 100px; display:flex; align-items: center; padding-right: 10px; justify-content: center"
		>
			<Chatbox size="25" />
		</div>
	{/if}
	<ion-label>
		<h2>{post.post.name}</h2>
		<h4><a>{getDisplayName(post)}</a> to {post.community.title}</h4>
		<h3>{post.counts.comments} comments</h3>
	</ion-label>
</ion-item>
