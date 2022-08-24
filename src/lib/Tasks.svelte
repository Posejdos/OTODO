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
    let user_tasks_db = [];

    /**
    * @type {string[]}
    */
    let user_tasks_local = [];
    
	logged_user.subscribe(value => {
		user = value;
	});

    async function getTasks() {
        // const res = await fetch('/tasks', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         user: user,
        //     }),
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // });

        // const res_json = await res.json();
        // const {tasks} = res_json
		// user_tasks_db = tasks; 

        //DEV
        user_tasks_db = ["DEV", "DUPA", "TASKS ARE HIR", ""]
        
        user_tasks_local = user_tasks_db
    }

</script>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

<section class="tasks">
    <p class="welcome">Welcome, {user}!</p>

    {#each user_tasks_local as task}

        <div class="single_task"> 
            <textarea 
                type="text" 
                class="field_task" 
                placeholder="New task..."
                bind:value={task}></textarea>

            <button class="btn_save">
                <span class="material-icons">
                    save
                </span>
            </button>

            <button class="btn_delete">
                <span class="material-icons">
                    delete
                </span>
            </button>

        </div>

    {/each}
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

    .single_task {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        height: 75px;
		width: 400px;	
		box-shadow: 0px 0px 8px #2f0839;
        margin-bottom: 20px;
        border-radius: 10px;
    }

    .field_task {
        resize: none;
        border: none;
        margin: 5px;
		background: rgb(206, 195, 195);
		padding: 10px;
		font-weight: 600;
        border-radius: 8px;
        width: 90%;
        height: 50%;
    }

    .btn_save, .btn_delete {
        --green-color: rgb(99, 224, 99);
        --orange-color: rgb(255, 153, 0);
        --red-color: rgb(220, 18, 18);

        top: 10%;
        height: 60%;
        width: 10%;
        margin: 5px;
    }

    .btn_save {
        background: var(--green-color);
    }

    .btn_delete {
        background: var(--red-color);
    }
</style>