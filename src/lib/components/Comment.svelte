<script>
	import { comment } from 'svelte/internal';
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

	console.log(commentTree);

	function collapse(tree) {
		tree.collapsed = !tree.collapsed;

		console.log('yoo');
		commentTree = commentTree;
	}
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
						<div class="comment-content">
							{tree.comment.comment.content}
						</div>
						<div class="comment-bar">
							<LinkOutline size="16" class="icon" />
							<ArrowUpOutline size="16" class="icon" />
							<ArrowDownOutline size="16" class="icon" />
							<StarOutline size="16" class="icon" />
							<CreateOutline size="16" class="icon" />
						</div>
					</div>
				</ion-item>
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
</style>
