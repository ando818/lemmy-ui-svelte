<script>
	import Post from '$lib/components/Post.svelte';
	import { currentPost } from '$lib/store';
	import { IonPage } from 'ionic-svelte';
	import {onMount} from 'svelte'
	export let data;


	let commentTree = {
		id: 0,
		children: []
	}


	onMount(() => {
		console.log(data)
		let commentsSorted = data.comments.sort((d) => d.comment.path).reverse()
		console.log(commentsSorted)
		for (let i=0; i<data.comments.length; i++) {
			let comment = data.comments[i]
			let path = comment.comment.path;
			let pathSplit = path.split('.')
			let root = commentTree;

			for (let j=1;j<pathSplit.length; j++) {
				let index = pathSplit[j]
				if(!root.children[index]) {
					root.children.push({
						id: comment.comment.id,
						comment
					})
				}
				//root = commentTree[]
			}
		}
		console.log(commentTree)
	})	

</script>

<IonPage>
	<ion-content fullscreen>
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
				<div id='comments'>
					<ion-list>
						{#each data.comments as comment}
						<ion-item>
							{comment.comment.content}

						</ion-item>
						{/each}
					</ion-list>
				</div>
			</div>


			<div id="right-bar">hi</div>
		</div>
	</ion-content>
</IonPage>

<style>
	#container {
		display: flex;
	}
	#main {
		width: 50%;
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
