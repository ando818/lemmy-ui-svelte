<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Post from '$lib/components/Post.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { isLoading, site, currentPost, instance, communities, isLoading, sortFilter } from '$lib/store';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let data;

	onMount(() => {
		$instance = 'lemmy.world';
	});

	let posts = [];

	let promise = init();
	onMount(async () => {
		
	});

	async function init() {
		$isLoading = true;
		await getSite();
		$isLoading = false;
	}

	async function getSite() {
		let resp = await fetch(`/apus/site?instance=${$instance}`);
		data.site = await resp.json();
	}

	async function getCommunities() {
		let resp = await fetch(`/apus/communities?instance=${$instance}`);
		data.communities = await resp.json();
	}

	async function getPosts() {}

</script>

<svelte:head>
	<title>Lemmy</title>
</svelte:head>
{#await promise then}
	<div class="main">
		<div class="posts">
			<PostList bind:posts community={null} />
		</div>
		<div class="side hidden-mobile">
			<div>
				<ion-searchbar placeholder="Search" />

				<ion-button>Create Post</ion-button>
				<ion-button>Create Community</ion-button>
			</div>

			<div class="site-description">
				<div class="site-description-inner">
					<div class="description-header"><h4>Lemmy.World</h4></div>
					<div>
						<img src={data.site.site_view.site.banner} />
					</div>
					{@html marked(data.site.site_view.site.sidebar)}
				</div>
			</div>
		</div>
	</div>
{/await}

<style>
	.main {
		position: relative;
		margin-top: 5px;
	}
	.description-header {
		margin-bottom: 10px;
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
		display: none;
		margin-top: 10px;
		background: #313131;
		border-radius: 4px;
		height: fit-content;
	}
	.hidden-mobile {
			display: none;
		}
	@media (max-width: 767px) {

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
		margin-right: 10vw;
	}
</style>
