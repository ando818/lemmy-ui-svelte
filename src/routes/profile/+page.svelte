<script lang="ts">
	import { IonPage } from 'ionic-svelte';
	import { goto } from '$app/navigation';

	import Comment from '$lib/components/Comment.svelte'
	import Post from '$lib/components/Post.svelte';
	import { currentPost, user } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	function goToPost(post) {
		$currentPost = post;
		goto(`/post/${post.post.id}`, {});
	}

	let commentTree = {
		children: []
	}
	onMount(() => {
		data.person.comments.forEach(comment => {
			comment.path = "0";
			console.log(comment)
			commentTree.children.push({
				comment: comment,
			children: []});
			console.log(commentTree)
			commentTree = commentTree;

		})
	})
</script>

<svelte:head>

	<style>
		.selection {
			width:30%;
			height: 60px;
			margin-left:20px;
			display:flex;
		}
	</style>
</svelte:head>

<ion-card>
	<ion-card-header>
	   <ion-card-subtitle>@{$user.username}</ion-card-subtitle>
	</ion-card-header>

 </ion-card>

 <div class='selection'> 

 <ion-segment mode='ios' on:ionChange={console.log} value="call">
	<ion-segment-button value="call">
	   <ion-label>Overview</ion-label>
	</ion-segment-button>
	<ion-segment-button value="favorite">
	   <ion-label>Comments</ion-label>
	</ion-segment-button>
	<ion-segment-button value="map">
	   <ion-label>Posts</ion-label>
	</ion-segment-button>
 </ion-segment>

 
 <ion-list>
	<ion-item>
	  <ion-select aria-label="Fruit" interface="popover" placeholder="Select fruit" value='apples'>
		<ion-select-option value="apples">New</ion-select-option>
		<ion-select-option value="oranges">Old</ion-select-option>
		<ion-select-option value="bananas">Top Day</ion-select-option>
		<ion-select-option value="bananas">Top Week</ion-select-option>
		<ion-select-option value="bananas">Top Month</ion-select-option>
		<ion-select-option value="bananas">All Time</ion-select-option>
	  </ion-select>
	</ion-item>
  </ion-list>

</div>

<Comment bind:commentTree={commentTree}></Comment>