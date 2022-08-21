<script>
    import {logged_user} from '$lib/Login.svelte';
	import { onMount } from 'svelte';

    onMount(async () => {
        await getTasks();
    });

    let user = '';

    /**
    * @type {string[]}
    */
    let user_tasks = [];
    
	logged_user.subscribe(value => {
		user = value;
	});

    async function getTasks() {
        const res = await fetch('/tasks', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
            }),
            headers: {
                "content-type": "application/json"
            }
        });

        const res_json = await res.json();
        const {tasks} = res_json
		user_tasks = tasks; 
    }
</script>

<section class="tasks">
    <p class="welcome">Welcome, {user}! {user_tasks}</p>
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