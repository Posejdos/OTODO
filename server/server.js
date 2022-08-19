import { handler } from '../build/handler.js'
import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok')
});

app.use(express.json())
app.post('/login', (req, res) => {
	const {username, password} = req.body

	res.sendStatus(200)
});

app.post('/signup', (req, res) => {
	const {username, password} = req.body

	console.log('Uname: ' + username)
	console.log('Pwd: ' + password)
	res.sendStatus(200)
});

app.use(handler)
app.use(cors())
app.listen(port, () => {
    console.log('App on', port)
});