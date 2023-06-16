<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import { MenuOutline } from 'svelte-ionicons';

	function goToPage(page) {
		goto(page, {});
	}

	function logout() {
		$user = null;
	}
	let expanded;
</script>

<svelte:head>
	<style>
		.logo {
			width: 10vw;
			
			margin-left: 4vw;
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
			margin-left:40%;
		}
		.header {
			display:flex;
			align-items:center;
			border-bottom: 1px solid gray;
			padding-bottom:4px;
			margin-top:4px;
		}
		.banner {
			margin-left:30px;

		}

		@media (max-width: 767px) {
        .hamburger {
			margin-left:30vw;
		}
		h4 {
			font-size:18px;
		}
	}
	</style>
</svelte:head>

<div class='header'>
	<img
		src="https://retarded.dev/pictrs/image/c9407c0c-de4b-4b25-8e45-3b3a946bef76.png"
		class="logo"
		on:click={() => goToPage('/')}
	/>

	<div class='banner navbar ion-text-center'>
		<h4>Lemmy</h4>
	</div>
	{#if !$user}
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
				<OverflowMenuItem text="Profile" on:click={() =>goToPage("/profile")}  />
				<OverflowMenuItem text="Settings" />
				<OverflowMenuItem danger text="Logout" on:click={logout} />
			</OverflowMenu>
		</div>
	{/if}
</div>
