<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';
	import { PasswordInput } from 'carbon-components-svelte';

	import Comment from '$lib/components/Comment.svelte';
	import Post from '$lib/components/Post.svelte';
	import LoggedIn from './LoggedIn.svelte';
	import { currentPost, isLoading, user } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {});

	let createMode = false;

	async function create() {
		createMode = true;
	}

	async function submit() {
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;
		let passwordVerify = document.getElementById('password-verify').value;

		$isLoading = true;
		let resp = await fetch('/apus/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
				passwordVerify
			})
		});
		let json = await resp.json();
		$user = json
		$user.username = username;
		console.log(json);
		$isLoading = false;
		goto(`/u/${username}`)
	}

	async function login() {
		let username = document.getElementById('username').value;
		let password = document.getElementById('password').value;

		$isLoading = true;
		let resp = await fetch('/apus/login', {
			method: 'POST',
			body: JSON.stringify({
				usernameOrEmail: username,
				password
			})
		});
		let json = await resp.json();
		$isLoading = false;

		console.log(json);

		if (json.success) {
			$user = json.user;
			$user.username = username;
			goto(`/u/${username}`)
		}
	}
</script>

<svelte:head>
	<style>
		.user {
			margin-left: auto;
			margin-right: auto;
			margin-top: 25%;
			width: 90vw;
			height: 40vh;
		}
		.inner {
			word-wrap: normal;
		}

		.login {
			width: 80vw;
			margin: auto;
		}
		.create {
			width: 80vw;
			margin: auto;
			text-align: center;
			margin-top: 15px;
			font-size: 16px;
		}
		.login-button {
			width: 80vw;
			height: 40px;
			margin: auto;
		}
		.actions {
			margin-top: 10px;
		}
		.header {
			text-align: center;
			margin-bottom: 10px;
		}
		.scroll-y {
			overflow-y: hidden;
		}
	</style>
</svelte:head>

<div class="user">
	<div class="inner">
		{#if !$user}
			<div class="header">
				<p>You are not signed in.</p>
				<p>Create an Account or Log in</p>
			</div>
			<ion-list>
				<ion-item>
					<ion-input id="username" label="Username" />
				</ion-item>

				<ion-item>
					<ion-input id="password" label="Password" type="password" />
				</ion-item>
				{#if createMode}
					<ion-item>
						<ion-input id="password-verify" label="Verify Password" type="password" />
					</ion-item>
				{/if}
			</ion-list>

			<div class="actions">
				{#if !createMode}
					<div class="login">
						<ion-button class="login-button" on:click={login}>Login</ion-button>
					</div>
					<div class="create">
						<a href="/profile" on:click={create}>Create account</a>
					</div>
					<div />
				{:else}
					<div class="login">
						<ion-button class="login-button" on:click={submit}>Submit</ion-button>
					</div>
				{/if}
			</div>
		{:else}
		<LoggedIn></LoggedIn>{/if}
	</div>
</div>
