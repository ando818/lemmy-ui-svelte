<script>
	import Post from '$lib/components/Post.svelte';
	import { currentPost } from '$lib/store';
	import { IonPage } from 'ionic-svelte';
	import { onMount } from 'svelte';
	import Comment  from '$lib/components/Comment.svelte'
	export let data;


	let commentTree = {
		id: 0,
		children: []
	};

	function convertToTree(comments) {
		let commentsSorted = comments.sort((d) => d.comment.path).reverse();
		for (let i = 0; i < commentsSorted.length; i++) {
			let comment = data.comments[i];
			let path = comment.comment.path;
			let pathSplit = path.split('.');
			let root = commentTree;

			for (let j = 1; j < pathSplit.length; j++) {
				let id = pathSplit[j];
				let index = root.children.findIndex((c) => c.id == id);
				if (index == -1) {
					root.children.push({
						id: comment.comment.id,
						comment,
						children: []
					});
				} else {
					root = root.children[index];
				}
			}
		}
	}
	onMount(() => {
		convertToTree(data.comments);
		commentTree = commentTree;
		console.log(commentTree)
	});
</script>

		<div id="container">
			<div id="main">
				<Post bind:post={$currentPost} />

				<div id="post">
					<ion-textarea
						class="post-text"
						readonly="true"
						disabled="true"
						placeholder={$currentPost.post.body}
					/>
				</div>
				<div id="comments">
					<Comment bind:commentTree={commentTree} level={0}></Comment>
				</div>
			</div>

			<div id="right-bar"></div>
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
		margin-left: 5px;
	}

	#post {
		margin-top: 5px;
		border: 1px solid gray;
		background: rgb(248, 248, 248);
		border-radius: 8px;
	}
</style>
