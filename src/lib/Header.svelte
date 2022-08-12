<!-- 	Header, which is always visible
		Simply speaking, this is the navbar
-->

<!-- import page to resolve URLs -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav>
    <ul>
        <li class:active={$page.url.pathname === '/'}>
			<a sveltekit:prefetch href="/">Home</a>
		</li>
        <li class:active={$page.url.pathname === '/about'}>
            <a sveltekit:prefetch href="/about">About</a>
        </li>
    </ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;        
		margin-bottom: -20px;
		--background: linear-gradient(90deg, #918ec7, #e98d8d);
		--pin: rgba(35, 61, 177, 0.5);
	}

	ul {
		border-radius: 15px;
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 10px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--pin);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: black;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: white;
	}
</style>
