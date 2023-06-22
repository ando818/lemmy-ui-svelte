<script>
	import { user } from '$lib/store.js';
	import SortPicker from '$lib/components/SortPicker.svelte';
	import SortSelector from '$lib/components/SortSelector.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let showPicker;

	export let path;

	let title = 'Home';
	onMount(() => {});

	function updateTitle() {
		if (path.startsWith('/c/')) {
			console.log('kaoko');
			title = path.replace('/c/', '');
		} else {
			title = 'Home';
		}
	}

	$: path, updateTitle();
</script>

<ion-toolbar>
	<ion-buttons slot="secondary">
		{#if path == '/communities'}
			<ion-button on:click={() => goto('/')}> Back </ion-button>
		{:else}
			<ion-button on:click={() => goto('/communities')}> C </ion-button>
		{/if}
	</ion-buttons>
	<ion-buttons slot="primary">
		<SortSelector />
	</ion-buttons>
	<ion-title>{title}</ion-title>
</ion-toolbar>

<SortPicker bind:showPicker />
