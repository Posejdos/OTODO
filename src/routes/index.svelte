<script lang="ts">
	import Hello from '$lib/Hello.svelte';
    import Header from '$lib/Header.svelte'
</script>

<svelte:head>
	<title>OTODO</title>
	<meta name="description" content="Svelte Online TODO app" />
</svelte:head>

<Header />
<Hello />