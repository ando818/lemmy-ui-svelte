<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Post from '$lib/components/Post.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import { currentPost, instance, communities, isLoading , sortFilter} from '$lib/store';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let data;

	onMount(() => {
		$instance = 'https://lemmy.world';
		$sortFilter = 'Hot'

	});

	let posts = [];

	let promise = getPosts();
	onMount(async () => {
		$communities = data.communities.communities;
	});

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
		margin-top: 20px;
		position: relative;
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
		margin-right: 10vw;
	}
</style>
