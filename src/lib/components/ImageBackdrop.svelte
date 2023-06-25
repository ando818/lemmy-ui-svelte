<script>
	export let backdropVisible = false;
	export let backdropImage;
</script>

{#if backdropVisible}
	<ion-backdrop
		tappable
		class={backdropVisible ? '' : 'hidden'}
		on:ionBackdropTap={() => (backdropVisible = false)}
	/>
	<div id="box" class={backdropVisible ? '' : 'hidden'}>
		<div style="width: 90vw; height: fit-content">
			<img
				style="max-height: 30vh;
            width: 90vw;"
				src={backdropImage}
			/>
		</div>
	</div>
{/if}

<style>
	ion-backdrop {
		opacity: 0.2;
		background: var(--ion-color-primary);
	}
	#box {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--ion-background-color, #fff);
		width: fit-content;
		height: fit-content;
		max-width: 90%;
		max-height: 300px;
		border-radius: 10px;
	}
</style>
