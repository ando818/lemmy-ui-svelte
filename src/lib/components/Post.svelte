<script>
	export let post;
	import { Chatbox } from 'svelte-ionicons';
</script>

<ion-item>
	<div style="margin-right:10px;">
		{post.counts.score}
	</div>
	{#if post.post.url}
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
		<h4>{post.creator.display_name} to {post.community.title}</h4>
		<h3>{post.counts.comments} comments</h3>
	</ion-label>
</ion-item>
