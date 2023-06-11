<script>
	import { comment } from 'svelte/internal';

	export let commentTree;
    export let level;

	console.log(commentTree);
</script>

<div class={level > 0 ? "indent": ""}>
	{#if commentTree.children}
		<ion-list>
			{#each commentTree.children as tree}
				<ion-item>
					{tree.comment.comment.content}
				</ion-item>
				{#if tree.children.length > 0}
					<svelte:self commentTree={tree} level={level+1}/>
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
</style>
