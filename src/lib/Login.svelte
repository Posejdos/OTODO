<div class="container">
	<div class="screen">
        <form class="login">
            <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input" placeholder="User name / Email">
            </div>
            <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" placeholder="Password">
            </div>
            <button class="button button">
                <span class="button__text">Log In</span>
            </button>				
        </form>
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

	.login__field {
        align-items: center;
		justify-content: center;
		padding: 20px 0px;	
	}

	.login__icon {
		color: #7875B5;
	}

	.login__input {
		border: none;
		border-bottom: 2px solid #D1D1D4;
		background: none;
		padding: 10px;
		font-weight: 700;
		width: 100%;
		transition: .2s;
	}

	.login__input:active,
	.login__input:focus,
	.login__input:hover {
		outline: none;
		border-bottom-color: #6A679E;
	}

	.button {
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

	.button:active,
	.button:focus,
	.button:hover {
		border-color: #6A679E;
		outline: none;
	}
</style>