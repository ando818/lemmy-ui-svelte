<script>
	import { comment, onMount } from 'svelte/internal';
	import { client } from '$lib/lemmyclient.js';
	import { marked } from 'marked';
	import { user, replyModalOpen, commentToReply } from '$lib/store.js';
	import ReplyModal from './ReplyModal.svelte';
	import {
		AddCircleOutline,
		RemoveCircleOutline,
		LinkOutline,
		ArrowUpOutline,
		ArrowDownOutline,
		StarOutline,
		CreateOutline,
		SendOutline,
		Send
	} from 'svelte-ionicons';
	export let comments = [];
	export let level;

	export let commentTree = [];

	function querySelectorAllShadows(selector, el = document.body) {
		// recurse on childShadows
		const childShadows = Array.from(el.querySelectorAll('*'))
			.map((el) => el.shadowRoot)
			.filter(Boolean);

		// console.log('[querySelectorAllShadows]', selector, el, `(${childShadows.length} shadowRoots)`);

		const childResults = childShadows.map((child) => querySelectorAllShadows(selector, child));

		// fuse all results into singular, flat array
		const result = Array.from(el.querySelectorAll(selector));
		return result.concat(childResults).flat();
	}

	onMount(() => {
		if (level == 0) {
			convertToTree(comments);
			commentTree = commentTree;
			console.log('comentre', commentTree);
		}
		let icons = document.getElementsByTagName('ion-select');
		for (let i = 0; i < icons.length; i++) {
			let icon = icons.item(i);
			console.log(icon.shadowRoot);
			console.log(icon.shadowRoot.querySelector('.select-wrapper'));
		}
	});

	function collapse(tree) {
		tree.collapsed = !tree.collapsed;
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

	let addComment = function addComment(com) {
		comments.push(com);
		console.log(com);
		commentTree.push({
			id: com.id,
			comment: com,
			children: []
		})
		commentTree = commentTree;
		console.log('newtree,', commentTree);
	};

	async function editComment(comment) {
		commentInEdit = JSON.parse(JSON.stringify(comment));
	}

	async function saveComment(comment) {
		console.log(comment);
		let resp = await fetch('/apus/comment/edit', {
			method: 'POST',
			body: JSON.stringify({
				commentId: comment.comment.id,
				content: commentInEdit.comment.content
			})
		});

		comment.comment.content = commentInEdit.comment.content;

		commentInEdit = null;
	}

	function convertToTree(comments) {
		let commentsSorted = comments.sort((a, b) => {
			if (a.comment.path.length === b.comment.path.length) {
				return a.comment.path.localeCompare(b.comment.path, undefined, { numeric: true });
			}
			return a.comment.path.length - b.comment.path.length;
		});
		for (let i = 0; i < commentsSorted.length; i++) {
			let comment = commentsSorted[i];
			let path = comment.comment.path;
			let pathSplit = path.split('.');
			let root = commentTree;

			for (let j = 1; j < pathSplit.length; j++) {
				let id = pathSplit[j];
				let index = root.findIndex((c) => c.id == id);
				if (index == -1) {
					root.push({
						id: comment.comment.id,
						comment,
						children: []
					});
				} else {
					root = root[index].children;
				}
			}
		}
		console.log('commenttree', commentTree);
	}

	function convertToComments(tree) {
		let comments = [];
		tree.children.forEach((child) => {
			comments.push(child.comment);
		});
		return comments;
	}

	function commentAction(event, comment) {
		console.log(event);
		if (event.detail.value == 'Reply') {
			$commentToReply = comment;
			openFor(comment);
		}
	}

	let commentReply;

	let editCommentContent;

	let commentInEdit;

	let openFor;
</script>

<ReplyModal bind:openFor bind:onClose={addComment} />
<div class={level > 0 ? 'indent' : ''}>
	{#if commentTree && commentTree}
		<ion-list>
			{#each commentTree as tree}
				<ion-item>
					<div class="comment" on:click={() => collapse(tree)}>
						<div class="comment-top">
							<p class="creator">{tree.comment.creator.name}</p>
							<div class="collapse" />
							<ion-select
								value="Active"
								name="sort"
								interface="action-sheet"
								toggle-icon="add"
								expanded-icon="remove"
								aria-label="fruit"
								on:ionChange={(event) => commentAction(event, tree.comment)}
							>
								<ion-select-option>Reply</ion-select-option>
							</ion-select>
						</div>
						{#if commentInEdit && tree.comment.comment.id == commentInEdit.comment.id}
							<div class="comment-content-edit">
								<textarea class="edit-textarea" bind:value={commentInEdit.comment.content} />
								<div>
									<ion-button on:click={() => saveComment(tree.comment)}>Save</ion-button>
									<ion-button on:click={() => (commentInEdit = false)}>Cancel</ion-button>
								</div>
							</div>
						{:else}
							<div class="comment-content">
								{@html marked(tree.comment.comment.content)}
							</div>
						{/if}
					</div></ion-item
				>
				{#if !tree.collapsed && tree.children.length >= 0}
					<svelte:self commentTree={tree.children} level={level + 1} />
				{/if}
			{/each}
		</ion-list>
	{/if}
</div>

<style>
	ion-select {
		position: absolute;
		right: 4vw;
		height: 8px;
		min-height: 0px;
		margin-top: 3px;
		width: 20px;
	}
	ion-select::part(icon) {
		content: url('/menu_white.svg');
	}
	ion-select::part(text) {
		display: none;
	}
	.indent {
		margin-inline-start: 1rem;
	}
	.comment.lines {
		position: relative;
		padding-inline-start: 1rem;
	}

	.collapse {
		margin-left: 4px;
		margin-top: 5px;
	}
	.comment {
		margin: 10px;
		width: 100%;
	}
	.comment-top {
		font-size: 12px;
		color: rgb(78, 154, 253);
		display: flex;
	}

	.comment-bar {
		display: grid;
		margin-top: 5px;
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

	@media (max-width: 767px) {
		:global(p) {
			font-size: 12px;
		}

		.creator {
			font-size: 10px;
		}

		.collapse {
			margin-left: 4px;
			margin-top: 0px;
		}
	}
</style>
