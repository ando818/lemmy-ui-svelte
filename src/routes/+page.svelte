<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Post from '$lib/components/Post.svelte';
	import { currentPost, instance } from '$lib/store';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let data;

	console.log(data);
	onMount(() => {
		$instance = 'https://lemmy.world';
	});
</script>

<svelte:head>
	<title>Lemmy</title>
</svelte:head>

<div class="main">
	<div class="posts">
		<ion-list>
			<ion-list-header>Posts</ion-list-header>
			{#each data.posts as post}
				<Post bind:post />
			{/each}
		</ion-list>
	</div>
	<div class="side hidden-mobile">
		<div>
			<ion-searchbar placeholder="Search" />

			<ion-button>Create Post</ion-button>
			<ion-button>Create Community</ion-button>
		</div>

		<div class="site-description">
			<div class="site-description-inner">
				<div class='description-header'><h4>Lemmy.World</h4></div>
				<div>
					<img src={data.site.site_view.site.banner} />
				</div>
				{@html marked(data.site.site_view.site.sidebar)}
			</div>
		</div>
	</div>
</div>

<style>
	.main {
		position: relative;
	}
	.description-header{
		margin-bottom:10px;
	}
	.posts {
		position: relative;
		width: 80%;
		margin: auto;
	}
	.site-description-inner {
		padding: 10px;
	}

	.site-description {
		margin-top:10px;
		background: #313131;
		border-radius: 4px;
		height: fit-content;
	}
	@media (max-width: 767px) {
		.hidden-mobile {
			display: none;
		}
		.posts {
			width: 100%;
		}
	}
	.side {
		position: absolute;
		top: 0;
		right: 0;
		height: 100vh;
		width: 20%;
		margin-right:15vw;
	}
</style>
