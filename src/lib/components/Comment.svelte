<script>
	import { comment } from 'svelte/internal';
	import { client } from '$lib/lemmyclient.js';
	import {marked} from 'marked';
	import {
		AddCircleOutline,
		RemoveCircleOutline,
		LinkOutline,
		ArrowUpOutline,
		ArrowDownOutline,
		StarOutline,
		CreateOutline
	} from 'svelte-ionicons';
	export let commentTree;
	export let level;

	let markdown;
	
	console.log(marked("hello"));

	function collapse(tree) {
		tree.collapsed = !tree.collapsed;

		console.log('yoo');
		commentTree = commentTree;
	}

	async function likeComment(comment) {
		let resp = await fetch('/apus/comment/like', {
			method: 'POST',
			body: JSON.stringify({
				commentId: comment.comment.id,
				score: 1
			})
		});
	}

	async function editComment(comment) {
		commentInEdit = JSON.parse(JSON.stringify(comment));
		
	}
	async function saveComment(comment) {
		console.log(comment)
		let resp = await fetch('/apus/comment/edit', {
			method: 'POST',
			body: JSON.stringify({
				commentId: comment.comment.id,
				content: commentInEdit.comment.content
			})
		});

		comment.comment.content = commentInEdit.comment.content

		commentInEdit = null;

	}
	
	let editCommentContent;

	let commentInEdit;
</script>

<div class={level > 0 ? 'indent' : ''}>
	{#if commentTree.children}
		<ion-list>
			{#each commentTree.children as tree}
				<ion-item>
					<div class="comment">
						<div class="comment-top">
							@{tree.comment.creator.name}
							<div class="collapse">
								{#if tree.collapsed}
									<AddCircleOutline size="14" class="collapse" on:click={() => collapse(tree)} />
								{:else}
									<RemoveCircleOutline size="14" class="collapse" on:click={() => collapse(tree)} />
								{/if}
							</div>
						</div>
						{#if commentInEdit && tree.comment.comment.id == commentInEdit.comment.id}
							<div class="comment-content-edit">
								<textarea class="edit-textarea" bind:value={commentInEdit.comment.content}></textarea>
								<div>
									<ion-button on:click={() => saveComment(tree.comment)}>Save</ion-button> 
									<ion-button on:click={() => commentInEdit = false}>Cancel</ion-button> 
								</div>
							</div>
						{:else}
							<div class="comment-content">
								{@html marked(tree.comment.comment.content)}
							</div>
							<div class="comment-bar">
								<div on:click={() => likeComment(tree.comment)}>
									<LinkOutline size="16" class="icon" />
								</div>
								<ArrowUpOutline size="16" class="icon" on:click={() => likeComment(tree.comment)} />
								<ArrowDownOutline size="16" class="icon" />
								<StarOutline size="16" class="icon" />
								<CreateOutline size="16" class="icon" on:click={() => editComment(tree.comment)} />
							</div>
						{/if}
					</div></ion-item
				>
				{#if !tree.collapsed && tree.children.length > 0}
					<svelte:self commentTree={tree} level={level + 1} />
				{/if}
			{/each}
		</ion-list>
	{/if}
</div>

<style>
	.indent {
		margin-inline-start: 1rem;
	}
	.comment.lines {
		position: relative;
		padding-inline-start: 1rem;
	}

	.collapse {
		margin-left: 4px;
	}
	.comment {
		margin: 10px;
		width: 100%;
	}
	.comment-top {
		margin-bottom: 5px;
		font-size: 12px;
		color: rgb(22, 36, 224);
		display: flex;
	}

	.comment-content {
		font-size: 16px;
	}
	.comment-bar {
		display: grid;
		margin-top: 10px;
		width: 20%;
		grid-template-columns: auto auto auto auto auto auto;
		margin-left: 5px;
	}
	.icon {
		padding-right: 10px;
	}

	.comment-content-edit {
		width: 100%;
	}
	.edit-textarea {
		width: 100%;
	}
</style>
