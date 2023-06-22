<script>
	import { sortFilter } from '$lib/store.js';

	function setSortFilter(event) {
        $sortFilter = event.detail.value;
    }
</script>

<ion-select
	value="Hot"
	name="sort"
	interface="action-sheet"
	toggleIcon="add"
	expandedIcon="remove"
	aria-label="fruit"
	on:ionChange={(event) => setSortFilter(event)}
>
	<ion-select-option on:change={() => console.log('hot')}>Hot</ion-select-option>
	<ion-select-option>Active</ion-select-option>
	<ion-select-option>Top</ion-select-option>
	<ion-select-option>1992</ion-select-option>
</ion-select>
