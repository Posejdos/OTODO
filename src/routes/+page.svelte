<!-- 
	This is the main page.
	Everything is dynamic in this app.
 -->

<script lang="ts">
	import Hello from '$lib/Hello.svelte';
	import Login, {logged_in} from '$lib/Login.svelte';
	import Tasks from '$lib/Tasks.svelte'

	/* Subscribe to know if user logged */
	let auth_done = false;
	logged_in.subscribe(value => {
		auth_done = value;
	});
</script>

<svelte:head>
	<title>OTODO</title>
	<meta name="description" content="Svelte Online TODO app" />
</svelte:head>

<!-- This is always visible -->
<Hello />

<!-- When user is logged in, show the tasks component -->
{#if !auth_done}
<Login />
{:else}  
<Tasks />
{/if}