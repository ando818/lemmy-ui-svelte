<script>
	import { instances, currentInstance, currentCommunity } from '$lib/store.js';
	import { goto } from '$app/navigation';

	console.log($currentCommunity);

	function setInstance(instance) {
		$currentInstance = instance;
		goto(`/c/${$currentCommunity}`);
	}
</script>

<ion-list>
	{#each $instances as instance}
		<ion-item on:click={() => setInstance(instance)}>
			{instance}
		</ion-item>
	{/each}
</ion-list>
