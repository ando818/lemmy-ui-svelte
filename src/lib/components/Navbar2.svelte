<script>
	import { user, currentInstance } from '$lib/store.js';
	import SortPicker from '$lib/components/SortPicker.svelte';
	import SortSelector from '$lib/components/SortSelector.svelte';
	import { go,goBack } from '$lib/utils.js';
	import { onMount } from 'svelte';
	let showPicker;

	export let path;

	let title = 'Home';
	onMount(() => {});

    let tabPaths = ['/profile','/home','instances']
	console.log('current', $currentInstance);

	function updateTitle() {
		if (path == '/') {
			title = 'Home';
		} else if (path.startsWith('/c/')) {
			title = path.replace('/c/', '');
		} else if (path.startsWith("/post")) {
            title = ""
        } else {
			title = path.replace('/', '');
		}
	}

    function back() {
        goBack();
    }

	let communites = ['Technology', 'Art', 'Funny'];

	let val;
	function handleInput(event) {
		console.log(event);
		val = event.detail.value;
	}

	let openPopover = false;
	$: path, updateTitle();
	$: $currentInstance;
</script>

<ion-popover trigger="click-trigger" triggerAction="click" is-open={openPopover}>
	<ng-template>
		<ion-content scroll-y="false"
			><ion-searchbar on:ionInput={handleInput} />
			<ion-list class='list'>
				{#each communites.filter((a) => a.includes(val)) as commune}
                <ion-item>
					<p
						class="search-result"
						on:click={() => {
							go(`/c/${commune}`);
							openPopover = false;
						}}
					>
						{commune}
					</p>
                </ion-item>
				{/each}
			</ion-list>
		</ion-content>
	</ng-template>
</ion-popover>

<ion-toolbar>
	<ion-buttons slot="secondary">
        {#if path != '/'}
			<ion-button on:click={() => back()}> Back </ion-button>
            {/if}

	</ion-buttons>

	<ion-buttons slot="primary">
        <ion-button on:click={() => go('/instances')}> {$currentInstance} </ion-button>

		<SortSelector />
        
	</ion-buttons>
	<ion-title id="click-trigger" on:click={() => (openPopover = true)}>{title}</ion-title>
</ion-toolbar>

<SortPicker bind:showPicker />

<style>
	ion-button {
		font-size: 12px;
	}
    ion-item::part(native) {
        background: cadetblue;

    }
	.search-result {
		font-size: 18px;
        border-radius: 10px;
        background: cadetblue;
        text-align: center;
        margin:auto;
	}
    .list {
        margin-left:5px;
        border-radius: 10px;
        background: cadetblue;

    }
</style>
