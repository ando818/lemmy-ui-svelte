<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
</script>

<ion-content>
	<div class='container'>
	<ion-list lines="full" class="ion-no-margin ion-no-padding">
		<ion-header translucent={true}>
			<ion-toolbar>
			   <ion-buttons slot="start">
				  <ion-menu-button />
			   </ion-buttons>
			   <ion-buttons slot="end">
			   </ion-buttons>
			   <ion-title>Create Account</ion-title>
			</ion-toolbar>
		 </ion-header>
		<ion-item>
			<ion-input label="Username" label-placement="floating" name="username" />
		</ion-item>
		<ion-item>
			<ion-input label="Email" label-placement="floating" name="email" />
		</ion-item>
		<ion-item>
			<ion-input label="Password" label-placement="floating" name="password" />
		</ion-item>
		<ion-item>
			<ion-input label="Verify Password" label-placement="floating" name="password-verify" />
		</ion-item>
		<div class="ion-padding">
			<ion-button expand="block" type="submit" class="ion-no-margin"> Create account </ion-button>
		 </div>
		
	</ion-list>
</div>
</ion-content>
<style>
	.container {
		width:50%;
		margin:auto;
		margin-top:5%;
	}

</style>