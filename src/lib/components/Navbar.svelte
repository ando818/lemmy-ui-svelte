<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { MenuOutline } from 'svelte-ionicons';
	import { MultiSelect } from 'carbon-components-svelte';

	function goToPage(page) {
		goto(page, {});
	}

	function logout() {
		$user = null;
	}
	let expanded;

	onMount(() => {});
</script>

<svelte:head>
	<style>
		.logo {
			width: 50px;
			height: 50px;
			margin-left: 30px;
		}
		.link {
			font-size: 14px;
		}
		.site-name {
			font-weight: 600;
		}

		.toolbar-container {
			overflow: visible;
			contain: unset !important;
		}

		.toolbar-content {
			overflow: visible;
			contain: unset !important;
		}

		:host(.in-toolbar) {
			overflow: visible;
			contain: unset !important;
		}
		.toolbar {
			overflow: visible;
			contain: unset;
		}
		.hamburger {
			display: flex;
			align-items: center;
			margin-left: 40%;
		}
		.header {
			width: 80%;
			margin: auto;
			display: flex;
			align-items: center;
			padding-bottom: 4px;
			margin-top: 4px;
		}
		.banner {
			margin-left: 30px;
		}
		@media (max-width: 767px) {
			.logo {
				width: 10vw;
				margin-left: 4vw;
			}
			.hamburger {
				margin-left: 30vw;
			}
			h4 {
				font-size: 18px;
			}
			.header {
				width: 100%;
			}
		}
	</style>
</svelte:head>

<div class="header">
	<img
		src="https://lemmy.world/pictrs/image/ff53606e-09ed-4f3e-b34d-a8d8b0398d48.jpeg?format=webp&thumbnail=96"
		class="logo"
		on:click={() => goToPage('/')}
	/>

	<div class="banner navbar ion-text-center">
		<h4>Lemmy</h4>
	</div>

	<div />
	<MultiSelect
		light={false}
		label="Instances"
		items={[
			{ id: '0', text: 'lemmy.world' },
			{ id: '1', text: 'beehaw.org' },
			{ id: '2', text: 'lemmy.ml' }
		]}
	/>
	{#if !$user}
		<ion-button
			fill="clear"
			routerLinkActive="active-link"
			class="link"
			on:click={() => goToPage('/communities')}
		>
			Communities
		</ion-button>

		<ion-button
			fill="clear"
			routerLinkActive="active-link"
			class="link"
			on:click={() => goToPage('/login')}
		>
			Login
		</ion-button>
		<ion-button
			fill="clear"
			routerLinkActive="active-link"
			class="link"
			on:click={() => goToPage('/signup')}
		>
			Sign up
		</ion-button>
	{:else}
		<div class="hamburger navbar ion-text-center">
			<div>
				{$user.username}
			</div>
			<OverflowMenu flipped light>
				<OverflowMenuItem text="Profile" on:click={() => goToPage('/profile')} />
				<OverflowMenuItem text="Settings" />
				<OverflowMenuItem danger text="Logout" on:click={logout} />
			</OverflowMenu>
		</div>
	{/if}
</div>
