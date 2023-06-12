<script lang="ts">
	import { goto } from '$app/navigation';
	import { TextInput, PasswordInput } from 'carbon-components-svelte';
	import { user } from '$lib/store';

	export let data;
	let usernameOrEmail;
	let password;

	async function login() {
		let resp = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				usernameOrEmail,
				password,
			})
		});
		let json = await resp.json();
		if (json.success) {
			$user = json.user;
			goToPage("/")
		}
	}
	function goToPage(page) {
		goto(page, {});
	}
</script>

<ion-content>
	<div class="container">
		<ion-list lines="full" class="ion-no-margin ion-no-padding">
			<ion-header translucent={true}>
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-button />
					</ion-buttons>
					<ion-buttons slot="end" />
					<ion-title>Login</ion-title>
				</ion-toolbar>
			</ion-header>
			<div class="input-text">
				<TextInput
					class="input-text"
					light
					labelText="User name or Email"
					placeholder=""
					bind:value={usernameOrEmail}
				/>
			</div>

			<div class="input-text">
				<PasswordInput
					class="input-text"
					light
					labelText="Password"
					placeholder=""
					bind:value={password}
				/>
			</div>
			<div class="ion-padding">
				<ion-button expand="block" type="submit" class="ion-no-margin" on:click={login}>
					Login
				</ion-button>
			</div>
		</ion-list>
	</div>
</ion-content>

<style>
	.container {
		width: 25%;
		margin: auto;
		margin-top: 5%;
	}
	.input-text {
		margin-top: 10px;
	}
</style>
