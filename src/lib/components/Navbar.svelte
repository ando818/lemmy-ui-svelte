<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';

	function goToPage(page) {
		console.log('fkoako');
		goto(page, {});
	}
</script>

<ion-header mode="ios">
	<ion-toolbar>
		<ion-row class="ion-align-items-center">
			<ion-col size="1" class="header-image">
				<img
					src="https://retarded.dev/pictrs/image/c9407c0c-de4b-4b25-8e45-3b3a946bef76.png?format=webp&thumbnail=96"
					class="logo ion-text-left"
				/>
			</ion-col>
			<div class="site-name">Lemmy</div>
			<ion-col size="4">
				<div class="navbar ion-text-center">
					<ion-button
						fill="clear"
						routerLink="/tabs/tab1"
						routerDirection="root"
						routerLinkActive="active-link"
						class="link"
					>
						Communities
					</ion-button>
					<ion-button fill="clear" routerLinkActive="active-link" class="link">
						Create Post
					</ion-button>
					<ion-button fill="clear" routerLinkActive="active-link" class="link">
						Create Community
					</ion-button>
				</div>
			</ion-col>
			<ion-col size="2" offset="4">
				<ion-button
					fill="clear"
					routerLinkActive="active-link"
					class="link"
					on:click={() => goToPage('/login')}
				>
					Login
				</ion-button>
				{#if !$user}
					<ion-button
						fill="clear"
						routerLinkActive="active-link"
						class="link"
						on:click={() => goToPage('/signup')}
					>
						Sign up
					</ion-button>
				{/if}
			</ion-col>
		</ion-row>
	</ion-toolbar>
</ion-header>

<style>
	.logo {
		margin-left: 30px;
		max-height: 45px;
	}
	.link {
		font-size: 14px;
	}
	.site-name {
		font-weight: 600;
	}
</style>
