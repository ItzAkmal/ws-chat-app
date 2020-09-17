import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import socket from 'socket.io'

import middlewares from './middlewares'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(
	PORT,
	console.log(`Listening on http://localhost:${PORT}...`)
)

const io = socket(server)

io.sockets.on('connection', (socket) => {
	console.log('new connection!')

	socket.on('send-message', (data) => {
		io.sockets.emit('recieve-message', data)
	})
})
