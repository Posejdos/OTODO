<script>
    import {logged_user} from '$lib/Login.svelte';

    let user = '';
	logged_user.subscribe(value => {
		user = value;
	});
</script>

<section class="tasks">
    <p class="welcome">Welcome, {user}!</p>
</section>

<style>
    .tasks {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;   
    }

	.welcome {
		font-family: 'Courier New', Courier, monospace;
        font-weight: 250;
        font-size: 25px;        
	}
</style>