<!-- 	This is the layout file, 
		global for all pages.

		Enables us to see the header
		and possibly a footnote on
		all pages.
-->

<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
