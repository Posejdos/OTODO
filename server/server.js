import { handler } from '../build/handler.js'
import express from 'express'
import cors from 'cors'
import {dbReturn, dbInit, tryLogin, trySignUp} from './my_db.js'

const app = express()
const port = process.env.PORT || 4000
await dbInit();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok')
});

app.use(express.json())
app.post('/login', async (req, res) => {
	const {username, password} = req.body

	const loginResult = await tryLogin(username, password);
	if (loginResult == dbReturn.userNotRegistered) {
		
	}

	else if (loginResult == dbReturn.wrongPassword) {

	}

	//here is OK logic
	res.sendStatus(200)
});

app.post('/signup', async (req, res) => {
	const {username, password} = req.body

	const signUpResult = await trySignUp(username, password);
	if (signUpResult == dbReturn.userAlreadyExists) {
		
	}

	//here is OK logic
	res.sendStatus(200);
});

app.use(handler)
app.use(cors())
app.listen(port, () => {
    console.log('App on', port)
});