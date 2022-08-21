import { handler } from '../build/handler.js'
import express from 'express'
import cors from 'cors'
import {dbReturn, dbInit, tryLogin, trySignUp, readTasks, addTask} from './my_db.js'

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
	if (loginResult == dbReturn.loginError) {
		res.json({
			userAuth: false,
		});

		return;
	}

	res.json({
		userAuth: true,
	});
});

app.post('/signup', async (req, res) => {
	const {username, password} = req.body

	const signUpResult = await trySignUp(username, password);
	if (signUpResult == dbReturn.userAlreadyExists) {
		res.json({
			ok: false,
		})

		return;
	}

	res.json({
		ok: true,
	})
});

app.post('/tasks', async (req, res) => {
	const {user} = req.body;
	const tasks = await readTasks(user);

	res.json({
		tasks: tasks,
	});
});

app.use(handler)
app.use(cors())
app.listen(port, () => {
    console.log('App on', port)
});