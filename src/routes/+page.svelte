<script>
	export let data;
</script>

<ion-card>
	<ion-card-content>
		<div>
			{#each data.communities as community}
				{community.community.name}
			{/each}
		</div>
		<div id="posts">
			{#each data.posts as post}
				<div class="post">
					{post.counts.score}
					{post.post.name}
				</div>
			{/each}
		</div>
	</ion-card-content>
</ion-card>
