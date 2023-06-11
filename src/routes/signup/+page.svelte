<script lang="ts">
	import { goto } from '$app/navigation';
	import { TextInput, PasswordInput } from 'carbon-components-svelte';
	import { user } from '$lib/store';

	export let data;
	let username;
	let email;
	let password;
	let passwordVerify;

	async function signup() {
		let resp = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password,
				passwordVerify
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
					<ion-title>Create Account</ion-title>
				</ion-toolbar>
			</ion-header>
			<div class="input-text">
				<TextInput
					class="input-text"
					light
					labelText="User name"
					placeholder="Enter user name..."
					bind:value={username}
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
			<div class="input-text">
				<PasswordInput
					class="input-text"
					light
					labelText="Verify Password"
					placeholder=""
					bind:value={passwordVerify}
				/>
			</div>
			<div class="ion-padding">
				<ion-button expand="block" type="submit" class="ion-no-margin" on:click={signup}>
					Create account
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
