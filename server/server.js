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
	console.log(req.body)
	res.sendStatus(200)
});

app.use(handler)
app.use(cors())

app.listen(port, () => {
    console.log('App on', port)
});