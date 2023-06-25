<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Post from '$lib/components/Post.svelte';
	import { currentPost, instance, communities } from '$lib/store';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let data;

	let map = {};
	function alphabetize() {
		for (let i = 0; i < communities.length; i++) {}
	}

	onMount(() => {
		console.log($communities);
	});

	async function getPosts() {}
</script>

<svelte:head>
	<title>Lemmy</title>
</svelte:head>

{#if $communities}
<ion-list>
	<ion-item>

	<a href="/">Home</a>
</ion-item>

	{#each $communities as community}
	<ion-item on:click={() => goto(`/c/${community.community.name}`)}>
		{community.community.name}
	</ion-item>
	{/each}
</ion-list>
{/if}

<style>
</style>
