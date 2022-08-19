<script lang="ts">
	let usernameInput = '';
	let passwordInput = '';
	let page_disable = false;

	function login() {
		if (!validateUserAndPasswd(usernameInput, passwordInput)) {
			/* TODO: clear username and passwd */
			alert("Username or password are too short");
			return;
		}
		
		page_disable = true;
		logged_in.set(true);
	}

	async function signUp() {
		if (!validateUserAndPasswd(usernameInput, passwordInput)) {
			/* TODO: clear username and passwd */
			alert("Username or password are too short.");
			return;			
		}

		const res = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({
				usr: usernameInput,
				pwd: passwordInput,
			}),
			headers: {
				"content-type": "application/json"
			}
		})
		
		const json = await res.json()
		let result = JSON.stringify(json)

		page_disable = true;
	}

	function validateUserAndPasswd(username: string, passwd: string): Boolean {
		return username.length > 3 && passwd.length > 3;
	}
</script>

<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	/* Use a store to pass indication if user is logged */
	export const logged_in = writable(false);
</script>

<div class="container">
	<div class="screen">
        <form class="login">
            <div class="login__field">                
                <input 
					type="text" 
					class="log_input" 
					placeholder="Username" 
					disabled={page_disable}
					bind:value={usernameInput}
				>

                <input 
					type="password" 
					class="log_input"						
					placeholder="Password"
					disabled={page_disable}
					bind:value={passwordInput}
				>
            </div>

            <button 
				type="button" 
				class="login_btn" 
				disabled={page_disable}
				on:click={login}>
					<span>Log In</span>
            </button>		
        </form>

		<button 
		type="button" 
		class="signup_btn" 
		disabled={page_disable}
		on:click={signUp}>
			<span>Sign Up</span>
		</button>

	</div>
</div>

<style>
	* {
		box-sizing: border-box;
		justify-content: center;
	}

	.container {		
		display: flex;
		align-items: center;
	}

	.screen {
        position: relative;	
		height: 300px;
		width: 360px;	
		box-shadow: 0px 0px 24px #5C5696;
        display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(30deg, #918ec7, #e98d8d);
		/* height: 100%; */
		width: 320px;
		padding: 30px;
        border-radius: 30px;
	}

	.login__field > *{
        align-items: center;
		justify-content: center;
		padding: 20px 20px;	
		margin: 10px 0;
	}

	.log_input {
		border: none;
		border-bottom: 2px solid #D1D1D4;
		background: none;
		padding: 10px;
		font-weight: 700;
		width: 100%;
		transition: .2s;
	}

	.log_input:active,
	.log_input:focus,
	.log_input:hover {
		outline: none;
		border-bottom-color: #6A679E;
	}

	.login_btn {
		background: #fff;
		font-size: 14px;
		margin-top: 10px;
		padding: 16px 20px;
		border-radius: 26px;
		border: 1px solid #D4D3E8;
		text-transform: uppercase;
		font-weight: 700;
		display: flex;
		align-items: center;
		width: 100%;
		color: #4C489D;
		box-shadow: 0px 2px 2px #5C5696;
		cursor: pointer;
		transition: .2s;
	}

	.signup_btn {
		background: #fff;
		font-size: 20px;
		margin-top: 30px;
		padding: 16px 20px;
		border-radius: 10px;
		border: 1px solid #D4D3E8;
		text-transform: uppercase;
		font-weight: 700;
		display: flex;
		align-items: center;
		width: 100%;
		color: #4C489D;
		box-shadow: 0px 2px 2px #5C5696;
		cursor: pointer;
		transition: .2s;
	}

	.signup_btn:active,
	.signup_btn:focus,
	.signup_btn:hover,
	.login_btn:active,
	.login_btn:focus,
	.login_btn:hover {
		border-color: #6A679E;
		outline: none;
	}

	.signup_btn:disabled,
	.login_btn:disabled {
		background: grey;
	}
</style>