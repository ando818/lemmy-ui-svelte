<script>
	import { replyModalOpen, commentToReply, currentInstance } from '$lib/store.js';
    import Vditor from "./Vditor.svelte";

    import { onMount } from 'svelte';

	let modal;

    let value;

    let comment;

    export let onClose;

    export const openFor = function openFor(com) {
        comment = com;
        console.log("comment",comment)
        $replyModalOpen = true;
    }

	function cancel() {
		$replyModalOpen = false;
		console.log(modal);
		modal.dismiss(null, 'cancel');
	}

	async function confirm() {
        console.log("comment",value, $commentToReply)
        let path = $commentToReply.comment.path.split('.');
        let parentId = parseInt(path[path.length-1])
        let resp = await fetch (`/apus/comment/create?instance=${$currentInstance}`, {
            method: "POST",
            body: JSON.stringify({
                content: value,
                postId: $commentToReply.comment.post_id,
                parentId: parentId
            }) 
        })

        let json = await resp.json();
        onClose(json.comment)
        $replyModalOpen = false;

	}

	onMount(() => {
		modal = document.querySelector('ion-modal');
	});

    function reply() {

    }
</script>

<ion-modal trigger="open-modal" is-open={$replyModalOpen}>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-button on:click={cancel}>Cancel</ion-button>
			</ion-buttons>
			<ion-title>Reply</ion-title>
			<ion-buttons slot="end">
				<ion-button on:click={confirm} strong="true">Submit</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding" scroll-y="false" >
        <Vditor bind:value={value}/>
	</ion-content>
</ion-modal>

<style >

    ion-textarea {
        height: 40vh;
    }

    .ion-padding {
        --padding-start: 0;
        --padding-end: 0;
        --padding-top:0;
    }
</style>