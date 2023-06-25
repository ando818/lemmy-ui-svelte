<script>
	import { setupIonicBase } from 'ionic-svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import ImageBackdrop from '$lib/components/ImageBackdrop.svelte';
	import { IonPage } from 'ionic-svelte';
	import 'carbon-components-svelte/css/white.css';
	import { isLoading} from "$lib/store.js"
	import {goto} from '$app/navigation'
	/* Call Ionic's setup routine */
	setupIonicBase();

	/* Import all components - or do partial loading - see below */
	import 'ionic-svelte/components/all';

	/* Theme variables */
	import '../theme/variables.css';

	/*
		This part - import 'ionic-svelte/components/all'; -  loads all components at once.

		This adds at least >800kb (uncompressed) to your bundle - 80 components (so do your math!!)

		You can also choose to import each component you want to use separately and leave out others.

		It is recommended to do this in this file, as you only need to do such once. But you are free
		to do this elsewhere if you like to code-split differently. 

		Example: if you replace the line import 'ionic-svelte/components/all'; with the imports below, you will see the resulting bundle being much smaller
		
		import 'ionic-svelte/components/ion-app';
		import 'ionic-svelte/components/ion-card';
		import 'ionic-svelte/components/ion-card-title';
		import 'ionic-svelte/components/ion-card-subtitle';
		import 'ionic-svelte/components/ion-card-header';
		import 'ionic-svelte/components/ion-card-content';
		import 'ionic-svelte/components/ion-chip';
		import 'ionic-svelte/components/ion-button';

		Click the ionic-svelte-components-all-import above to go to the full list of possible imports.

		Please don't forget to import ion-app in this file when you decide to code-split:

	    import 'ionic-svelte/components/ion-app';

		You can report issues here - https://github.com/Tommertom/svelte-ionic-npm/issues
		Want to know what is happening more - follow me on Twitter - https://twitter.com/Tommertomm
		Discord channel on Ionic server - https://discordapp.com/channels/520266681499779082/1049388501629681675
	*/
	import { fade } from 'svelte/transition';

	export let data;

	import {
		AddCircleOutline,
		RemoveCircleOutline,
		LinkOutline,
		ArrowUpOutline,
		ArrowDownOutline,
		StarOutline,
		CreateOutline,
		HomeOutline,
		PersonCircleOutline,
		MailOutline,
		SearchOutline,
		ServerOutline,
		SettingsOutline
	} from 'svelte-ionicons';
</script>

<ion-app>
	<IonPage>
		<ion-loading
			is-open={$isLoading}
			trigger="open-loading"
			message="Loading..."
			duration="10000"
			spinner="circles"
		/>
		<Navbar2 path={data.pathname} />

		<ion-content scroll-y={data.pathname =='/profile' ? "false": "true"}>
			{#key data.pathname}
				<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}
				>
					<slot />
				</div>
			{/key}
		</ion-content>
		<ion-toolbar>
			<ion-tabs>
				<!-- Tab views -->
				<ion-tab tab="home" />
				<ion-tab tab="contact" />
				<ion-tab tab="account" />
				<ion-tab tab="mail" />
				<ion-tab tab="instances" />
				<ion-tab tab="settings" />

				<!-- Tab bar -->
				<ion-tab-bar slot="bottom">

					<ion-tab-button tab="home" href='/' on:click={() => goto("/")}>
						<HomeOutline/>
					</ion-tab-button>
					<ion-tab-button tab="account" href='/profile' on:click={() => goto("/profile")}>
						<PersonCircleOutline />
					</ion-tab-button>
					<ion-tab-button tab="contact">
						<MailOutline />
					</ion-tab-button>
					<ion-tab-button tab="mail">
						<SearchOutline />
					</ion-tab-button>
					<ion-tab-button tab="instances" on:click={() => goto("/instances/settings")}>
						<ServerOutline />
					</ion-tab-button>
					<ion-tab-button tab="settings">
						<SettingsOutline />
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-toolbar>
	</IonPage>
</ion-app>
