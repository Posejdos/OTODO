import { handler } from '../build/handler.js'
import express from 'express'
import cors from 'cors'
import {dbReturn, dbInit, tryLogin, trySignUp, readTasks, updateTasks} from './my_db.js'

/* Express framework boilerplate code */
const app = express()
const port = process.env.PORT || 4000

/* Initialize the database */
await dbInit();

/* Add a route that lives separately from the SvelteKit app */
app.get('/healthcheck', (req, res) => {
    res.end('ok')
});

/* We send data using JSON*/
app.use(express.json())

/* Process login request */
app.post('/login', async (req, res) => {
	const {username, password} = req.body

	/* 	Check if password matches username in database
		and send an adequate response
	*/
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

/* Process signup request */
app.post('/signup', async (req, res) => {
	const {username, password} = req.body

	/* 	Check if username doesn't exist in database
		and send an adequate response
	*/
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

/* Retrieve the task list from database */
app.post('/tasks', async (req, res) => {
	const {user} = req.body;
	const tasks = await readTasks(user);

	res.json({
		tasks: tasks,
	});
});

/* Update the task list */
app.post('/update_tasks', async (req, res) => {
	const {user, values} = req.body;
	await updateTasks(user, values);

	res.json(200);
});

/* Express framework boilerplate code */
app.use(handler)
app.use(cors())
app.listen(port, () => {
    console.log('App on', port)
});