<script lang="ts">
	import Hello from '$lib/Hello.svelte';
	import Login from '$lib/Login.svelte';

	let logged_in: boolean = false;
</script>

<svelte:head>
	<title>OTODO</title>
	<meta name="description" content="Svelte Online TODO app" />
</svelte:head>

<Hello />

{#if !logged_in}
<Login />
{:else}
<Hello />
{/if}