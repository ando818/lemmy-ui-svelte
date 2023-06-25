<script>
	import Post from '$lib/components/Post.svelte';
	import { currentPost , replyModalOpen} from '$lib/store';
	import { IonPage } from 'ionic-svelte';
	import { onMount } from 'svelte';
	import Comment from '$lib/components/Comment.svelte';
	import ImageBackdrop from '$lib/components/ImageBackdrop.svelte';
	export let data;

	import { marked } from 'marked';

	let textArea;

	onMount(() => {
		$replyModalOpen = false;
		let images = document.getElementsByTagName('img');
		console.log('images', images);
		for (let i = 0; i < images.length; i++) {
			let img = images.item(i);
			img.addEventListener('click', function (e) {
				console.log(img.src)
				backdropImage = img.src
				backdropVisible  =true;
			});
		}
	});

	let backdropVisible = false;
	let backdropImage;
	console.log("post",$currentPost, data.comments)
</script>

<ImageBackdrop bind:backdropVisible bind:backdropImage></ImageBackdrop>
<div id="container">
	<div id="main">
		<Post bind:post={$currentPost} main={true} />

		<div id="post">
			{#if $currentPost.post.body}
			<div class="post-text">
				{@html marked($currentPost.post.body)}
			</div>
			{/if}
		</div>
		<div id="comments">
			<Comment bind:comments={data.comments} level={0} />
		</div>
	</div>

</div>

<style>
	#container {
		display: flex;
	}
	#main {
		width: 60%;
		margin: auto;
	}
	#right-bar {
		width: 20%;
	}
	.post-text {
		padding: 4px;
		opacity: 1;
	}

	#post {
		margin-top: 5px;
		border: 1px solid gray;
		background: #2f2c2c;
		border-radius: 8px;
	}
	@media (max-width: 767px) {
		#main {
			width: 100vw;
		}
		#post {
			margin-left: 3vw;
		}
	}
</style>
